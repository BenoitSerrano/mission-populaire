const ROUTE_KEYS = [
    'HOME',
    'JOB_OFFERS',
    'MY_ADS',
    'AD_CREATION',
    'AD_EDITION',
    'APPLICATION',
    'AD_APPLICATIONS',
    'MISSION_DETAILS',
    'SIGN_IN',
] as const;

type routeKeyType = (typeof ROUTE_KEYS)[number];

export { ROUTE_KEYS };

export type { routeKeyType };
