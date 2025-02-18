import { styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

function Section(props: { title: string; children: ReactNode }) {
    return (
        <Container>
            <TitleContainer>
                <Typography variant="h6">{props.title}</Typography>
            </TitleContainer>
            <ContentContainer>{props.children}</ContentContainer>
        </Container>
    );
}

const Container = styled('div')(({ theme }) => ({
    flex: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const TitleContainer = styled('div')(({ theme }) => ({
    flex: 1,
    paddingBottom: theme.spacing(1),
    borderBottom: `solid 1px ${theme.palette.divider}`,
}));

const ContentContainer = styled('div')(({ theme }) => ({
    flex: 1,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
}));

export { Section };
