import Joi from 'joi';
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
        method: 'PUT',
        path: '/applications/:applicationId',
        kind: 'authenticated',
        controller: applicationController.pickApplication,
        schema: Joi.object({ userId: Joi.string().required(), missionId: Joi.string().required() }),
    },
    {
        method: 'POST',
        path: '/missions/:missionId/applications',
        kind: 'authenticated',
        controller: applicationController.createApplication,
    },
];

export { applicationRoutes };
