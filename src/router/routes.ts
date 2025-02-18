import { routeType } from './types';
import { missionRoutes } from './missionRoutes';
import { userRoutes } from './userRoutes';

const routes = buildRoutes();

function buildRoutes() {
    const routes: routeType<any, any, any>[] = [];
    routes.push(...missionRoutes);
    routes.push(...userRoutes);
    return routes;
}

export { routes };
