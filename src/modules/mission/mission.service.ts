import { dataSource } from '../../dataSource';
import { eventEmitter } from '../../events/event.emitter';
import { buildApplicationService } from '../application';
import { SKILLS, User } from '../user';
import { skillType } from '../user/types';
import { Mission } from './Mission.entity';
import { missionDtoType } from './types';

export { buildMissionService };

function buildMissionService() {
    const missionRepository = dataSource.getRepository(Mission);

    const missionService = {
        getJobOffers,
        getAdsByUser,
        getAdDetails,
        getJobOfferDetails,
        getAdWithApplications,
        setStatusFilled,
        updateAd,
        createAd,
        deleteAd,
        convertMissionToAd,
        convertMissionToJobOffer,
    };

    return missionService;

    async function createAd(missionDto: missionDtoType, user: User) {
        const mission = new Mission();
        mission.title = missionDto.title;
        mission.description = missionDto.description;
        mission.requiredSkills = missionDto.requiredSkills;
        mission.deadline = new Date(Number(missionDto.deadline)).toISOString();
        mission.status = 'open';
        mission.user = user;

        await missionRepository.save(mission);
        eventEmitter.MISSION_CREATED.emit({
            displayName: user.displayName,
            message: 'Une nouvelle mission a été créée !',
        });
        return { ok: true };
    }

    async function setStatusFilled(data: { missionId: string }) {
        await missionRepository.update({ id: data.missionId }, { status: 'filled' });
    }

    async function updateAd(missionId: Mission['id'], missionDto: missionDtoType) {
        const result = await missionRepository.update(
            { id: missionId },
            { ...missionDto, deadline: new Date(Number(missionDto.deadline)).toISOString() },
        );
        if (result.affected !== 1) {
            throw new Error(`Could not find mission "${missionId}"`);
        }

        return { ok: true };
    }

    function computeIsUserCompetentSkillMapping(skills: User['skills']) {
        const isUserCompetentSkillMapping = Object.keys(SKILLS).reduce(
            (acc, SKILL_LABEL) => ({ ...acc, [SKILL_LABEL]: false }),
            {} as Record<skillType, boolean>,
        );
        for (const userSkill of skills) {
            isUserCompetentSkillMapping[userSkill] = true;
        }
        return isUserCompetentSkillMapping;
    }

    async function getJobOffers(user: User) {
        const total = await missionRepository.count({});

        const missions = await missionRepository.find({});
        const jobOffers = convertMissionsToJobOffer(missions, user);
        return {
            total,
            jobOffers,
        };
    }

    async function getAdsByUser(user: User) {
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
            ads: missions.map((mission) => ({
                ...mission,
                requiredSkills: mission.requiredSkills.map(
                    (requiredSkill) => SKILLS[requiredSkill],
                ),
                applicationCount: mappedApplicationCount[mission.id],
            })),
        };
    }

    function convertMissionsToJobOffer(missions: Mission[], user: User) {
        const isUserCompetentSkillMapping = computeIsUserCompetentSkillMapping(user.skills);
        return missions.map((mission) => ({
            ...mission,
            requiredSkills: mission.requiredSkills.map((requiredSkill) => ({
                ...SKILLS[requiredSkill],
                isCompetent: isUserCompetentSkillMapping[requiredSkill],
            })),
        }));
    }

    function convertMissionToAd(mission: Mission, applicationCount: number) {
        return { ...mission, applicationCount };
    }

    function convertMissionToJobOffer(mission: Mission, user: User) {
        const isUserCompetentSkillMapping = computeIsUserCompetentSkillMapping(user.skills);
        return {
            ...mission,
            requiredSkills: mission.requiredSkills.map((requiredSkill) => ({
                ...SKILLS[requiredSkill],
                isCompetent: isUserCompetentSkillMapping[requiredSkill],
            })),
        };
    }

    async function getAdWithApplications(missionId: Mission['id']) {
        const applicationService = buildApplicationService();

        const mission = await missionRepository.findOneByOrFail({ id: missionId });
        const applications = await applicationService.retrieveApplications(missionId);
        return {
            ad: {
                ...mission,
                requiredSkills: mission.requiredSkills.map(
                    (requiredSkill) => SKILLS[requiredSkill],
                ),
            },
            applications: applications.map(({ user, ...application }) => ({ user, application })),
        };
    }

    async function getAdDetails(missionId: Mission['id'], user: User) {
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

    async function getJobOfferDetails(missionId: Mission['id'], user: User) {
        const applicationService = buildApplicationService();
        const mission = await missionRepository.findOneByOrFail({
            id: missionId,
        });
        const jobOffer = convertMissionToJobOffer(mission, user);
        const application = await applicationService.retrieveApplication(missionId, user.id);
        return {
            jobOffer,
            application,
        };
    }

    async function deleteAd(missionId: Mission['id'], user: User) {
        await missionRepository.delete({ id: missionId, user });
        return { ok: true };
    }
}
