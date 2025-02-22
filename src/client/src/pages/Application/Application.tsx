import { useParams } from 'react-router-dom';
import { applicationsApi } from '../../lib/api/applicationsApi';
import { Query } from '../../components/Query';
import { styled } from '@mui/material';

function Application() {
    const params = useParams<{ applicationId: string }>();
    const applicationId = params.applicationId as string;
    const getApplication = () => applicationsApi.getApplication({ applicationId });
    return (
        <Query apiCall={getApplication} queryKey={['applications', applicationId]}>
            {(application) => (
                <Container>
                    <Page>truc</Page>
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
const Page = styled('div')(({ theme }) => ({
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '2px',
    width: '40%',
    height: '95%',
}));

export { Application };
