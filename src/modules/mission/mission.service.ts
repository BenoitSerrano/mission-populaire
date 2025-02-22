import { dataSource } from '../../dataSource';
import { buildApplicationService } from '../application';
import { SKILLS, User } from '../user';
import { Mission } from './Mission.entity';
import { missionDtoType } from './types';

export { buildMissionService };

function buildMissionService() {
    const missionRepository = dataSource.getRepository(Mission);

    const missionService = {
        getMissions,
        getMissionsByUser,
        getMissionDetails,
        getMissionWithApplications,
        updateMission,
        createMission,
        deleteMyMission,
    };

    return missionService;

    async function createMission(missionDto: missionDtoType, user: User) {
        const mission = new Mission();
        mission.title = missionDto.title;
        mission.description = missionDto.description;
        mission.requiredSkills = missionDto.requiredSkills;
        mission.deadline = new Date(Number(missionDto.deadline)).toISOString();
        mission.status = 'open';
        mission.user = user;

        await missionRepository.save(mission);
        return { ok: true };
    }

    async function updateMission(missionId: Mission['id'], missionDto: missionDtoType) {
        const result = await missionRepository.update(
            { id: missionId },
            { ...missionDto, deadline: new Date(Number(missionDto.deadline)).toISOString() },
        );
        if (result.affected !== 1) {
            throw new Error(`Could not find mission "${missionId}"`);
        }

        return { ok: true };
    }

    async function getMissions() {
        const total = await missionRepository.count({});

        const missions = await missionRepository.find({});
        return {
            total,
            missions: missions.map((mission) => ({
                ...mission,
                requiredSkills: mission.requiredSkills.map(
                    (requiredSkill) => SKILLS[requiredSkill],
                ),
            })),
        };
    }

    async function getMissionsByUser(user: User) {
        const applicationService = buildApplicationService();

        const total = await missionRepository.count({});

        const missions = await missionRepository.find({
            where: { user: { id: user.id } },
        });

        const mappedApplicationCount = await applicationService.getMappedApplicationCountByMission(
            missions.map(({ id }) => id),
        );
        return {
            total,
            missions: missions.map((mission) => ({
                ...mission,
                requiredSkills: mission.requiredSkills.map(
                    (requiredSkill) => SKILLS[requiredSkill],
                ),
                applicationCount: mappedApplicationCount[mission.id],
            })),
        };
    }

    async function getMissionWithApplications(missionId: Mission['id']) {
        const applicationService = buildApplicationService();

        const mission = await missionRepository.findOneByOrFail({ id: missionId });
        const applications = await applicationService.retrieveApplications(missionId);
        return {
            mission: {
                ...mission,
                requiredSkills: mission.requiredSkills.map(
                    (requiredSkill) => SKILLS[requiredSkill],
                ),
            },
            applications,
        };
    }

    async function getMissionDetails(missionId: Mission['id'], user: User) {
        const applicationService = buildApplicationService();
        const mission = await missionRepository.findOneByOrFail({
            id: missionId,
        });
        const application = await applicationService.retrieveApplication(missionId, user.id);
        return {
            ...mission,
            requiredSkills: mission.requiredSkills.map((requiredSkill) => SKILLS[requiredSkill]),
            application,
        };
    }

    async function deleteMyMission(missionId: Mission['id'], user: User) {
        await missionRepository.delete({ id: missionId, user });
        return { ok: true };
    }
}
