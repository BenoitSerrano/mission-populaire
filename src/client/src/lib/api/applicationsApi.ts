import { applicationStatusType } from '../../types';
import { performApiCall } from './utils';

const applicationsApi = {
    createApplication,
    getApplication,
};

type applicationApiType = {
    id: string;
    status: applicationStatusType;
    content: string;
    appliedAt: string;
    user: {
        id: string;
        displayName: string;
    };
};

async function getApplication(params: { applicationId: string }) {
    const URI = `applications/${params.applicationId}`;
    return performApiCall<applicationApiType>(URI, 'GET');
}

async function createApplication(params: { missionId: string; content: string }) {
    const URI = `missions/${params.missionId}/applications`;
    return performApiCall(URI, 'POST', { content: params.content });
}

export { applicationsApi };
export type { applicationApiType };
