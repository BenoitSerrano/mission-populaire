import { Routes, Route } from 'react-router-dom';

import { ROUTE_ELEMENTS } from './routeElements';
import { ROUTE_KEYS, routeKeyType } from './routeKeys';
import { ROUTE_PATHS } from './routePaths';
import { TitleWrapper } from './TitleWrapper';
import { ROUTE_TITLES } from './routeTitles';
import { AuthenticatedPage } from '../components/AuthenticatedPage';

function Router() {
    return <Routes>{ROUTE_KEYS.map((routeKey) => renderElement(routeKey))}</Routes>;
}

function renderElement(routeKey: routeKeyType) {
    const { element, kind } = ROUTE_ELEMENTS[routeKey];
    const { path } = ROUTE_PATHS[routeKey];
    const documentTitle = ROUTE_TITLES[routeKey];

    switch (kind) {
        case 'public':
            return (
                <Route
                    key={path}
                    path={path}
                    element={<TitleWrapper documentTitle={documentTitle}>{element}</TitleWrapper>}
                />
            );
        case 'chef':
        case 'militant':
            return (
                <Route
                    key={path}
                    path={path}
                    element={
                        <TitleWrapper documentTitle={documentTitle}>
                            <AuthenticatedPage routeKey={routeKey}>{element}</AuthenticatedPage>
                        </TitleWrapper>
                    }
                />
            );
    }
}

export { Router };
