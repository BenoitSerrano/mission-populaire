import Joi from 'joi';
import { buildUserController } from '../modules/user';
import { routeType } from './types';

const userController = buildUserController();

const userRoutes: Array<routeType<any, any, any>> = [
    {
        method: 'POST',
        path: '/login',
        kind: 'public',
        controller: userController.login,
    },
    {
        method: 'GET',
        path: '/available-skills',
        kind: 'public',
        controller: userController.getAvailableSkills,
    },
];

export { userRoutes };
