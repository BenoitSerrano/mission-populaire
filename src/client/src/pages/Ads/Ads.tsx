import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { styled } from '@mui/material';
import { AdsTable } from './AdsTable';
import { AdsMenu } from './AdsMenu';

function Ads() {
    return (
        <Container>
            <AdsMenu />
            <Query apiCall={() => missionsApi.getAds()} queryKey={['ads']}>
                {(data) => <AdsTable ads={data.ads} />}
            </Query>
        </Container>
    );
}

export { Ads };

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));
