import { buildApplicationController } from '../modules/application';
import { routeType } from './types';

const applicationController = buildApplicationController();

const applicationRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/applications/:applicationId',
        kind: 'authenticated',
        controller: applicationController.getApplication,
    },
    {
        method: 'POST',
        path: '/missions/:missionId/applications',
        kind: 'authenticated',
        controller: applicationController.createApplication,
    },
];

export { applicationRoutes };
