import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { Missions } from '../pages/Missions';
import { SignIn } from '../pages/SignIn';
import { MissionDetails } from '../pages/MissionDetails';
import { MissionCreation } from '../pages/MissionCreation';

type routeKindType = 'dashboard' | 'public';

const ROUTE_ELEMENTS: Record<
    (typeof ROUTE_KEYS)[number],
    { element: JSX.Element; kind: routeKindType }
> = {
    HOME: { element: <Home />, kind: 'public' },
    MISSIONS: { element: <Missions />, kind: 'dashboard' },
    MISSION_CREATION: { element: <MissionCreation />, kind: 'dashboard' },
    MISSION_DETAILS: { element: <MissionDetails />, kind: 'dashboard' },
    SIGN_IN: { element: <SignIn />, kind: 'public' },
};

export { ROUTE_ELEMENTS };
