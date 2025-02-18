import { performApiCall } from './utils';

const missionsApi = {
    getMissions,
    getMissionDetails,
    createMission,
    deleteMyMission,
};

async function createMission(params: { title: string }) {
    const URI = `me/missions`;
    return performApiCall<missionApiType>(URI, 'POST', params);
}

type missionApiType = { id: string; title: string };

async function getMissions(params: { page: number; perPage: number }) {
    const URI = `missions`;
    return performApiCall<{ total: number; missions: missionApiType[] }>(URI, 'GET', undefined, {
        page: params.page,
        perPage: params.perPage,
    });
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
export type { missionApiType };
