import Joi from 'joi';
import { buildMissionController } from '../modules/mission';
import { routeType } from './types';
import { SKILL_LABELS } from '../modules/user';

const missionController = buildMissionController();

const missionRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/job-offers',
        kind: 'authenticated',
        controller: missionController.getJobOffers,
    },
    {
        method: 'GET',
        path: '/ads',
        kind: 'authenticated',
        controller: missionController.getAds,
    },
    {
        method: 'GET',
        path: '/ads/:missionId/applications',
        kind: 'authenticated',
        controller: missionController.getAdWithApplications,
    },
    {
        method: 'PUT',
        path: '/ads/:missionId',
        kind: 'authenticated',
        controller: missionController.updateAd,
        schema: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            deadline: Joi.string()
                .required()
                .regex(/^[\d]+$/),
            requiredSkills: Joi.array().items(Joi.string().valid(...SKILL_LABELS)),
        }),
    },
    {
        method: 'POST',
        path: '/ads',
        kind: 'authenticated',
        controller: missionController.createAd,
        schema: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            deadline: Joi.string()
                .required()
                .regex(/^[\d]+$/),
            requiredSkills: Joi.array().items(Joi.string().valid(...SKILL_LABELS)),
        }),
    },

    {
        method: 'GET',
        path: '/job-offers/:missionId',
        kind: 'authenticated',
        controller: missionController.getJobOfferDetails,
    },
    {
        method: 'GET',
        path: '/ads/:missionId',
        kind: 'authenticated',
        controller: missionController.getAdDetails,
    },
    {
        method: 'DELETE',
        kind: 'authenticated',
        path: '/ads/:missionId',
        controller: missionController.deleteAd,
    },
];

export { missionRoutes };
