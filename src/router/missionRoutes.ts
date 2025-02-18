import Joi from 'joi';
import { buildMissionController } from '../modules/mission';
import { routeType } from './types';

const missionController = buildMissionController();

const missionRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'GET',
        path: '/missions',
        kind: 'authenticated',
        controller: missionController.getMissions,
    },
    {
        method: 'POST',
        path: '/me/missions',
        kind: 'authenticated',
        controller: missionController.createMission,
        schema: Joi.object({
            title: Joi.string().required(),
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
