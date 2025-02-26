import { ROUTE_KEYS } from './routeKeys';

const ROUTE_PATHS: Record<(typeof ROUTE_KEYS)[number], { path: string }> = {
    HOME: {
        path: '/',
    },
    JOB_OFFERS: { path: '/job-offers' },
    AD_CREATION: { path: '/ads/new' },
    AD_EDITION: { path: '/ads/:missionId/edit' },
    ADS: { path: '/ads' },
    AD_APPLICATIONS: { path: '/ads/:missionId/applications' },
    APPLICATION: { path: '/applications/:applicationId' },
    JOB_OFFER_DETAILS: {
        path: '/job-offers/:missionId',
    },
    SIGN_IN: { path: '/sign-in' },
};

export { ROUTE_PATHS };
