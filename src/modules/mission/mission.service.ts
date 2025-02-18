import { dataSource } from '../../dataSource';
import { buildApplicationService } from '../application';
import { User } from '../user';
import { Mission } from './Mission.entity';
import { missionDtoType } from './types';

export { buildMissionService };

function buildMissionService() {
    const missionRepository = dataSource.getRepository(Mission);

    const missionService = {
        getMissions,
        getMissionsByUser,
        getMissionDetails,
        createMission,
        deleteMyMission,
    };

    return missionService;

    async function createMission(missionDto: missionDtoType, user: User) {
        const mission = new Mission();
        mission.title = missionDto.title;
        mission.description = missionDto.description;
        mission.deadline = new Date(missionDto.deadline).toISOString();
        mission.status = 'open';
        mission.user = user;

        return missionRepository.save(mission);
    }

    async function getMissions() {
        const total = await missionRepository.count({});

        const missions = await missionRepository.find({});
        return { total, missions };
    }

    async function getMissionsByUser(user: User) {
        const total = await missionRepository.count({});

        const missions = await missionRepository.find({ where: { user } });
        return { total, missions };
    }

    async function getMissionDetails(missionId: Mission['id'], user: User) {
        const applicationService = buildApplicationService();
        const mission = await missionRepository.findOneByOrFail({
            id: missionId,
        });
        const application = await applicationService.retrieveApplication(missionId, user.id);
        return { ...mission, application };
    }

    async function deleteMyMission(missionId: Mission['id'], user: User) {
        await missionRepository.delete({ id: missionId, user });
        return { ok: true };
    }
}
