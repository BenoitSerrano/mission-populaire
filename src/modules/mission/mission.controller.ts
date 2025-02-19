import { User } from '../user';
import { buildMissionService } from './mission.service';
import { missionDtoType } from './types';

export { buildMissionController };

function buildMissionController() {
    const missionService = buildMissionService();
    const missionController = {
        getMissions,
        getMyMissions,
        getMissionDetails,
        getMissionWithApplications,
        createMission,
        deleteMyMission,
    };

    return missionController;

    async function getMissionDetails(params: { urlParams: { missionId: string } }, user: User) {
        return missionService.getMissionDetails(params.urlParams.missionId, user);
    }

    async function getMissionWithApplications(params: { urlParams: { missionId: string } }) {
        return missionService.getMissionWithApplications(params.urlParams.missionId);
    }

    async function getMissions() {
        return missionService.getMissions();
    }

    async function getMyMissions(_params: {}, user: User) {
        return missionService.getMissionsByUser(user);
    }

    async function createMission(
        params: {
            body: missionDtoType;
        },
        user: User,
    ) {
        return missionService.createMission(
            {
                title: params.body.title,
                description: params.body.description,
                deadline: params.body.deadline,
            },
            user,
        );
    }

    async function deleteMyMission(params: { urlParams: { missionId: string } }, user: User) {
        return missionService.deleteMyMission(params.urlParams.missionId, user);
    }
}
