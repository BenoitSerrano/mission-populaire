import { Navigate } from 'react-router-dom';
import { localStorage } from '../lib/localStorage';
import { pathHandler } from '../lib/pathHandler';

function Home(): JSX.Element {
    const userInfo = localStorage.userInfoHandler.get();
    if (!userInfo) {
        return <Navigate to={pathHandler.getRoutePath('SIGN_IN')} />;
    }
    const role = localStorage.roleHandler.get();
    switch (role) {
        case 'CHEF_GA':
            return <Navigate to={pathHandler.getRoutePath('MY_ADS')} />;
        case 'MILITANT':
            return <Navigate to={pathHandler.getRoutePath('MISSIONS')} />;
    }
}

export { Home };
