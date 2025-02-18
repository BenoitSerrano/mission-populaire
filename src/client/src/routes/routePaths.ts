import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: {
        path: '/',
    },
    MISSIONS: { path: '/missions' },
    MISSION_CREATION: { path: '/missions/new' },
    MISSION_DETAILS: {
        path: '/missions/:missionId',
    },
    SIGN_IN: { path: '/sign-in' },
};

export { ROUTE_PATHS };
