const ROUTE_KEYS = [
    'HOME',
    'JOB_OFFER_DETAILS',
    'JOB_OFFERS',
    'ADS',
    'AD_CREATION',
    'AD_EDITION',
    'APPLICATION',
    'AD_APPLICATIONS',
    'SIGN_IN',
] as const;

type routeKeyType = (typeof ROUTE_KEYS)[number];

export { ROUTE_KEYS };

export type { routeKeyType };
