import { User } from '../user';
import { buildApplicationService } from './application.service';

export { buildApplicationController };

function buildApplicationController() {
    const applicationService = buildApplicationService();
    const applicationController = {
        getJobOfferApplication,
        pickApplication,
        createApplication,
    };

    async function getJobOfferApplication(params: { urlParams: { applicationId: string } }) {
        return applicationService.getJobOfferApplicationById(params.urlParams.applicationId);
    }

    async function pickApplication(params: {
        body: { missionId: string; userId: string };
        urlParams: { applicationId: string };
    }) {
        return applicationService.pickApplication({
            applicationId: params.urlParams.applicationId,
            missionId: params.body.missionId,
            userId: params.body.userId,
        });
    }

    async function createApplication(
        params: {
            body: { content: string };
            urlParams: { missionId: string };
        },
        user: User,
    ) {
        return applicationService.createApplication({
            content: params.body.content,
            missionId: params.urlParams.missionId,
            user,
        });
    }

    return applicationController;
}
