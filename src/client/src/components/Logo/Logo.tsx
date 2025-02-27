import { Link } from 'react-router-dom';
import { ReactComponent as SvgLogo } from './logo.svg';
import { pathHandler } from '../../lib/pathHandler';

function Logo() {
    const homePath = pathHandler.getRoutePath('HOME');
    return (
        <Link to={homePath}>
            <SvgLogo />
        </Link>
    );
}

export { Logo };
