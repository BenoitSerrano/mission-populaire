import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: {
        path: '/',
    },
    MISSIONS: { path: '/missions' },
    AD_CREATION: { path: '/ads/new' },
    AD_EDITION: { path: '/ads/:missionId/edit' },
    MY_ADS: { path: '/ads' },
    AD_APPLICATIONS: { path: '/ads/:missionId/applications' },
    APPLICATION: { path: '/applications/:applicationId' },
    MISSION_DETAILS: {
        path: '/missions/:missionId',
    },
    SIGN_IN: { path: '/sign-in' },
};

export { ROUTE_PATHS };
