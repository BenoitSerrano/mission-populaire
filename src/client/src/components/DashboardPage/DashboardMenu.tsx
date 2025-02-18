import { ElementType } from 'react';
import { locale } from '../../locale';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { DashboardMenuItem } from './DashboardMenuItem';
import { routeKeyType } from '../../routes/routeKeys';
import { pathHandler } from '../../lib/pathHandler';
import { styled } from '@mui/material';
import { Logo } from '../Logo';

const MENU_KEYS = ['MISSIONS'] as const;
type menuKeyType = (typeof MENU_KEYS)[number];

const menuKeyMapping: Record<
    menuKeyType,
    {
        title: string;
        IconComponent: ElementType<{ color: 'success' | 'action' | 'primary' }>;
        routeKeys: routeKeyType[];
        baseRouteKey: routeKeyType;
    }
> = {
    MISSIONS: {
        baseRouteKey: 'MISSIONS',
        routeKeys: ['MISSIONS', 'MISSION_DETAILS', 'MISSION_CREATION'],
        title: locale.shared.dashboardMenu.items.missions,
        IconComponent: MonitorHeartIcon,
    },
};

function DashboardMenu(props: { routeKey: routeKeyType }) {
    return (
        <Container>
            <Logo />
            {MENU_KEYS.map((MENU_KEY) => (
                <DashboardMenuItemContainer key={MENU_KEY}>
                    <DashboardMenuItem
                        to={pathHandler.getRoutePath(menuKeyMapping[MENU_KEY].baseRouteKey)}
                        isActive={computeIsActive(MENU_KEY)}
                        title={menuKeyMapping[MENU_KEY].title}
                        IconComponent={menuKeyMapping[MENU_KEY].IconComponent}
                    />
                </DashboardMenuItemContainer>
            ))}
        </Container>
    );

    function computeIsActive(menuKey: menuKeyType) {
        return menuKeyMapping[menuKey].routeKeys.includes(props.routeKey);
    }
}

const Container = styled('div')(({ theme }) => ({
    maxWidth: '20%',
    minWidth: '20%',
    display: 'flex',
    padding: theme.spacing(3),
    flexDirection: 'column',
}));
const DashboardMenuItemContainer = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
}));

export { DashboardMenu };
