import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { Missions } from '../pages/Missions';
import { SignIn } from '../pages/SignIn';
import { MissionDetails } from '../pages/MissionDetails/MissionDetails';
import { AdCreation } from '../pages/AdUpsertion';
import { MyAds } from '../pages/MyAds';
import { AdEdition } from '../pages/AdUpsertion/AdEdition';
import { AdApplications } from '../pages/AdApplications';
import { Application } from '../pages/Application';

type routeRoleType = 'militant' | 'public' | 'chef';

const ROUTE_ELEMENTS: Record<
    (typeof ROUTE_KEYS)[number],
    | { element: JSX.Element; kind: 'public' }
    | { element: JSX.Element; kind: 'authenticated'; roles: routeRoleType[] }
> = {
    HOME: { element: <Home />, kind: 'public' },
    MISSIONS: { element: <Missions />, kind: 'authenticated', roles: ['militant'] },
    MY_ADS: { element: <MyAds />, kind: 'authenticated', roles: ['chef'] },
    AD_CREATION: { element: <AdCreation />, kind: 'authenticated', roles: ['chef'] },
    AD_EDITION: { element: <AdEdition />, kind: 'authenticated', roles: ['chef'] },
    AD_APPLICATIONS: { element: <AdApplications />, kind: 'authenticated', roles: ['chef'] },
    APPLICATION: { element: <Application />, kind: 'authenticated', roles: ['chef', 'public'] },
    MISSION_DETAILS: { element: <MissionDetails />, kind: 'authenticated', roles: ['militant'] },
    SIGN_IN: { element: <SignIn />, kind: 'public' },
};

export { ROUTE_ELEMENTS };
