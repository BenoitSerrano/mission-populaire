import { User } from '../user';
import { buildApplicationService } from './application.service';

export { buildApplicationController };

function buildApplicationController() {
    const applicationService = buildApplicationService();
    const applicationController = {
        getJobOfferApplication,
        createApplication,
    };

    async function getJobOfferApplication(params: { urlParams: { applicationId: string } }) {
        return applicationService.getJobOfferApplicationById(params.urlParams.applicationId);
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
