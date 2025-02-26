import { applicationStatusType } from '../../types';
import { adApiType } from './missionsApi';
import { userApiType } from './usersApi';
import { performApiCall } from './utils';

const applicationsApi = {
    createApplication,
    getAdApplication,
};

type applicationApiType = {
    id: string;
    status: applicationStatusType;
    content: string;
    appliedAt: string;
};

async function getAdApplication(params: { applicationId: string }) {
    const URI = `ad-applications/${params.applicationId}`;
    return performApiCall<{ application: applicationApiType; user: userApiType; ad: adApiType }>(
        URI,
        'GET',
    );
}

async function createApplication(params: { missionId: string; content: string }) {
    const URI = `missions/${params.missionId}/applications`;
    return performApiCall(URI, 'POST', { content: params.content });
}

export { applicationsApi };
export type { applicationApiType };
