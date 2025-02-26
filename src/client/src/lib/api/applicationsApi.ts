import { applicationStatusType } from '../../types';
import { jobOfferApiType } from './missionsApi';
import { userApiType } from './usersApi';
import { performApiCall } from './utils';

const applicationsApi = {
    createApplication,
    pickApplication,
    getJobOfferApplication,
};

type applicationApiType = {
    id: string;
    status: applicationStatusType;
    content: string;
    appliedAt: string;
};

async function getJobOfferApplication(params: { applicationId: string }) {
    const URI = `ad-applications/${params.applicationId}`;
    return performApiCall<{
        application: applicationApiType;
        user: userApiType;
        jobOffer: jobOfferApiType;
    }>(URI, 'GET');
}

async function pickApplication(params: {
    applicationId: string;
    missionId: string;
    userId: string;
}) {
    const URI = `missions/${params.missionId}/applications/${params.applicationId}`;
    return performApiCall(URI, 'PUT', { missionId: params.missionId, userId: params.userId });
}

async function createApplication(params: { missionId: string; content: string }) {
    const URI = `missions/${params.missionId}/applications`;
    return performApiCall(URI, 'POST', { content: params.content });
}

export { applicationsApi };
export type { applicationApiType };
