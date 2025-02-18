import { ReactNode } from 'react';
import { styled } from '@mui/material';
import { DashboardMenu } from './DashboardMenu';
import { routeKeyType } from '../../routes/routeKeys';

function DashboardPage(props: { children: ReactNode; routeKey: routeKeyType }) {
    return (
        <Container>
            <DashboardMenu routeKey={props.routeKey} />
            <ContentContainer>{props.children}</ContentContainer>
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.white,
    height: '100vh',
    display: 'flex',
}));
const ContentContainer = styled('div')(({ theme }) => ({
    background: theme.palette.common.black,
    flex: 1,
    display: 'flex',
}));
export { DashboardPage };
