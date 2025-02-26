import { useParams } from 'react-router-dom';
import { applicationsApi } from '../../lib/api/applicationsApi';
import { Query } from '../../components/Query';
import { styled, Typography } from '@mui/material';

function Application() {
    const params = useParams<{ applicationId: string }>();
    const applicationId = params.applicationId as string;
    const getAdApplication = () => applicationsApi.getAdApplication({ applicationId });
    return (
        <Query apiCall={getAdApplication} queryKey={['ad-applications', applicationId]}>
            {(application) => (
                <Container>
                    <Page>
                        <Title></Title>
                    </Page>
                </Container>
            )}
        </Query>
    );
}

const Container = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const Title = styled(Typography)(({ theme }) => ({ background: 'red' }));
const Page = styled('div')(({ theme }) => ({
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '2px',
    width: '40%',
    height: '95%',
}));

export { Application };
