const ROUTE_KEYS = ['HOME', 'MISSIONS', 'MISSION_CREATION', 'MISSION_DETAILS', 'SIGN_IN'] as const;

type routeKeyType = (typeof ROUTE_KEYS)[number];

export { ROUTE_KEYS };

export type { routeKeyType };
