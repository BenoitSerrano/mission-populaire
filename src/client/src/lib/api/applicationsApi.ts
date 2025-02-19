import { applicationStatusType } from '../../types';
import { performApiCall } from './utils';

const applicationsApi = {
    createApplication,
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

async function createApplication(params: { missionId: string; content: string }) {
    const URI = `missions/${params.missionId}/applications`;
    return performApiCall(URI, 'POST', { content: params.content });
}

export { applicationsApi };
export type { applicationApiType };
