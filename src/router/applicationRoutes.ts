import { buildApplicationController } from '../modules/application';
import { routeType } from './types';

const applicationController = buildApplicationController();

const applicationRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/ad-applications/:applicationId',
        kind: 'authenticated',
        controller: applicationController.getJobOfferApplication,
    },
    {
        method: 'POST',
        path: '/missions/:missionId/applications',
        kind: 'authenticated',
        controller: applicationController.createApplication,
    },
];

export { applicationRoutes };
