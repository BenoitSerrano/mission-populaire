import { ReactNode } from 'react';
import { styled } from '@mui/material';
import { routeKeyType } from '../../routes/routeKeys';
import { Header, HEADER_HEIGHT } from '../Header/Header';

function AuthenticatedPage(props: { children: ReactNode; routeKey: routeKeyType }) {
    return (
        <MainContainer>
            <Header />
            <Container>{props.children}</Container>
        </MainContainer>
    );
}

const Container = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.white,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
    flex: 1,
    display: 'flex',
}));

const MainContainer = styled('div')(({ theme }) => ({
    height: '100vh',
    flex: 1,
}));
export { AuthenticatedPage };
