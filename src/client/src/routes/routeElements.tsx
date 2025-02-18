import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { Missions } from '../pages/Missions';
import { SignIn } from '../pages/SignIn';
import { MissionDetails } from '../pages/MissionDetails';
import { AdCreation } from '../pages/AdCreation';
import { MyAds } from '../pages/MyAds';

type routeKindType = 'militant' | 'public' | 'chef';

const ROUTE_ELEMENTS: Record<
    (typeof ROUTE_KEYS)[number],
    { element: JSX.Element; kind: routeKindType }
> = {
    HOME: { element: <Home />, kind: 'public' },
    MISSIONS: { element: <Missions />, kind: 'militant' },
    MY_ADS: { element: <MyAds />, kind: 'chef' },
    AD_CREATION: { element: <AdCreation />, kind: 'chef' },
    MISSION_DETAILS: { element: <MissionDetails />, kind: 'militant' },
    SIGN_IN: { element: <SignIn />, kind: 'public' },
};

export { ROUTE_ELEMENTS };
