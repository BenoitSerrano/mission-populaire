import Joi from 'joi';
import { buildMissionController } from '../modules/mission';
import { routeType } from './types';
import { SKILL_LABELS } from '../modules/user';

const missionController = buildMissionController();

const missionRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/missions',
        kind: 'authenticated',
        controller: missionController.getMissions,
    },
    {
        method: 'GET',
        path: '/me/missions',
        kind: 'authenticated',
        controller: missionController.getMyMissions,
    },
    {
        method: 'GET',
        path: '/me/missions/:missionId/applications',
        kind: 'authenticated',
        controller: missionController.getMissionWithApplications,
    },
    {
        method: 'PUT',
        path: '/me/missions/:missionId',
        kind: 'authenticated',
        controller: missionController.updateMission,
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
        path: '/me/missions',
        kind: 'authenticated',
        controller: missionController.createMission,
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
        path: '/missions/:missionId',
        kind: 'authenticated',
        controller: missionController.getMissionDetails,
    },
    {
        method: 'DELETE',
        kind: 'authenticated',
        path: '/me/missions/:missionId',
        controller: missionController.deleteMyMission,
    },
];

export { missionRoutes };
