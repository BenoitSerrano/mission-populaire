import { dataSource } from '../../dataSource';
import { User } from '../user';
import { Mission } from './Mission.entity';
import { missionDtoType } from './types';

export { buildMissionService };

function buildMissionService() {
    const missionRepository = dataSource.getRepository(Mission);
    const missionService = {
        getMissions,
        getMissionDetails,
        createMission,
        deleteMyMission,
    };

    return missionService;

    async function createMission(missionDto: missionDtoType, user: User) {
        const mission = new Mission();
        mission.title = missionDto.title;
        mission.user = user;

        return missionRepository.save(mission);
    }

    async function getMissions(filter: { limit: number; offset: number }) {
        const total = await missionRepository.count({});

        const missions = await missionRepository.find({
            skip: filter.offset,
            take: filter.limit,
        });
        return { total, missions };
    }

    async function getMissionDetails(missionId: Mission['id']) {
        const mission = await missionRepository.findOneByOrFail({
            id: missionId,
        });
        return {
            mission,
        };
    }

    async function deleteMyMission(missionId: Mission['id'], user: User) {
        await missionRepository.delete({ id: missionId, user });
        return { ok: true };
    }
}
