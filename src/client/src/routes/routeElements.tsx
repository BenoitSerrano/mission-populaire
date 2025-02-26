import { Home } from '../pages/Home';
import { ROUTE_KEYS } from './routeKeys';
import { JobOffers } from '../pages/JobOffers';
import { SignIn } from '../pages/SignIn';
import { JobOfferDetails } from '../pages/JobOfferDetails';
import { AdCreation } from '../pages/AdUpsertion';
import { Ads } from '../pages/Ads';
import { AdEdition } from '../pages/AdUpsertion/AdEdition';
import { AdApplications } from '../pages/AdApplications';
import { Application } from '../pages/Application';

type routeRoleType = 'militant' | 'public' | 'chef';

const ROUTE_ELEMENTS: Record<
    (typeof ROUTE_KEYS)[number],
    | { element: JSX.Element; kind: 'public' }
    | {
          element: JSX.Element;
          kind: 'authenticated';
          roles: routeRoleType[];
      }
> = {
    HOME: { element: <Home />, kind: 'public' },
    JOB_OFFERS: { element: <JobOffers />, kind: 'authenticated', roles: ['militant'] },
    ADS: { element: <Ads />, kind: 'authenticated', roles: ['chef'] },
    AD_CREATION: { element: <AdCreation />, kind: 'authenticated', roles: ['chef'] },
    AD_EDITION: { element: <AdEdition />, kind: 'authenticated', roles: ['chef'] },
    AD_APPLICATIONS: { element: <AdApplications />, kind: 'authenticated', roles: ['chef'] },
    APPLICATION: { element: <Application />, kind: 'authenticated', roles: ['chef', 'militant'] },
    JOB_OFFER_DETAILS: { element: <JobOfferDetails />, kind: 'authenticated', roles: ['militant'] },
    SIGN_IN: { element: <SignIn />, kind: 'public' },
};

export { ROUTE_ELEMENTS };
