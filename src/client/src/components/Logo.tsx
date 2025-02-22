import { Link } from 'react-router-dom';
import { pathHandler } from '../lib/pathHandler';

function Logo() {
    const homePath = pathHandler.getRoutePath('HOME');
    return <Link to={homePath}>Mission Populaire</Link>;
}

export { Logo };
