import { missionStatusType } from '../../types';
import { applicationApiType } from './applicationsApi';
import { skillType, userApiType } from './usersApi';
import { performApiCall } from './utils';

const missionsApi = {
    getJobOffers,
    getAds,
    getJobOfferDetails,
    getAdDetails,
    getAdWithApplications,
    updateAd,
    createAd,
    deleteAd,
};

async function createAd(params: {
    title: string;
    description: string;
    deadline: number;
    requiredSkills: string[];
}) {
    const URI = `ads`;
    return performApiCall<{ ok: true }>(URI, 'POST', {
        title: params.title,
        description: params.description,
        deadline: `${params.deadline}`,
        requiredSkills: params.requiredSkills,
    });
}

async function updateAd(params: {
    missionId: string;
    title: string;
    description: string;
    deadline: number;
    requiredSkills: string[];
}) {
    const URI = `ads/${params.missionId}`;
    return performApiCall<adApiType>(URI, 'PUT', {
        title: params.title,
        description: params.description,
        deadline: `${params.deadline}`,
        requiredSkills: params.requiredSkills,
    });
}

type adApiType = {
    id: string;
    title: string;
    deadline: string;
    description: string;
    status: missionStatusType;
    requiredSkills: skillType[];
    publishedAt: string;
    applicationCount: number;
};

type jobOfferApiType = {
    id: string;
    title: string;
    description: string;
    deadline: string;
    status: missionStatusType;
    publishedAt: string;
    requiredSkills: Array<skillType & { isCompetent: boolean }>;
};

async function getJobOffers(params: {}) {
    const URI = `job-offers`;
    return performApiCall<{ total: number; jobOffers: jobOfferApiType[] }>(
        URI,
        'GET',
        undefined,
        {},
    );
}

async function getAds() {
    const URI = `ads`;
    return performApiCall<{ total: number; ads: adApiType[] }>(URI, 'GET', undefined, {});
}

async function getJobOfferDetails(missionId: string) {
    const URI = `job-offers/${missionId}`;
    return performApiCall<{ jobOffer: jobOfferApiType; application: applicationApiType | null }>(
        URI,
        'GET',
    );
}

async function getAdDetails(missionId: string) {
    const URI = `ads/${missionId}`;
    return performApiCall<adApiType>(URI, 'GET');
}

async function getAdWithApplications(missionId: string) {
    const URI = `ads/${missionId}/applications`;
    return performApiCall<{
        ad: adApiType;
        applications: Array<{ application: applicationApiType; user: userApiType }>;
    }>(URI, 'GET');
}

async function deleteAd(missionId: string) {
    const URI = `ads/${missionId}`;
    return performApiCall<{ ok: boolean }>(URI, 'DELETE');
}

export { missionsApi };
export type { adApiType, jobOfferApiType };
