import { styled } from '@mui/material';
import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { JobOffersTable } from './JobOffersTable';

function JobOffers() {
    return (
        <Container>
            <Query apiCall={() => missionsApi.getJobOffers({})} queryKey={['job-offers']}>
                {(data) => <JobOffersTable jobOffers={data.jobOffers} />}
            </Query>
        </Container>
    );
}

export { JobOffers };

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));
