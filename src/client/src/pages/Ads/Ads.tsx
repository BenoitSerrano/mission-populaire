import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { styled } from '@mui/material';
import { AdsTable } from './AdsTable';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function Ads() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button variant="contained" onClick={navigateToCreateAd}>
                {locale.ads.createAd}
            </Button>
            <Query apiCall={() => missionsApi.getAds()} queryKey={['ads']}>
                {(data) => <AdsTable ads={data.ads} />}
            </Query>
        </Container>
    );

    function navigateToCreateAd() {
        navigate(pathHandler.getRoutePath('AD_CREATION'));
    }
}

export { Ads };

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));
