import { applicationApiType } from './applicationsApi';
import { performApiCall } from './utils';

const missionsApi = {
    getMissions,
    getMyMissions,
    getMissionDetails,
    editMission,
    createMission,
    deleteMyMission,
};

async function createMission(params: { title: string; description: string; deadline: number }) {
    const URI = `me/missions`;
    return performApiCall<adApiType>(URI, 'POST', params);
}

async function editMission(params: {
    missionId: string;
    title: string;
    description: string;
    deadline: number;
}) {
    const URI = `me/missions/${params.missionId}`;
    return performApiCall<adApiType>(URI, 'PUT', {
        title: params.title,
        description: params.description,
        deadline: params.deadline,
    });
}

type missionApiType = {
    id: string;
    title: string;
    description: string;
    deadline: string;
    publishedAt: string;
    application: applicationApiType | null;
};
type adApiType = { id: string; title: string; description: string; publishedAt: string };

async function getMissions(params: {}) {
    const URI = `missions`;
    return performApiCall<{ total: number; missions: missionApiType[] }>(URI, 'GET', undefined, {});
}

async function getMyMissions() {
    const URI = `me/missions`;
    return performApiCall<{ total: number; missions: adApiType[] }>(URI, 'GET', undefined, {});
}

async function getMissionDetails(missionId: string) {
    const URI = `missions/${missionId}`;
    return performApiCall<missionApiType>(URI, 'GET');
}

async function deleteMyMission(missionId: string) {
    const URI = `me/missions/${missionId}`;
    return performApiCall<{ ok: boolean }>(URI, 'DELETE');
}

export { missionsApi };
export type { missionApiType, adApiType };
