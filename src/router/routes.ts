import { routeType } from './types';
import { missionRoutes } from './missionRoutes';
import { userRoutes } from './userRoutes';
import { applicationRoutes } from './applicationRoutes';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...missionRoutes);
    routes.push(...userRoutes);
    routes.push(...applicationRoutes);
    return routes;
}

export { routes };
