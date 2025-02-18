import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { styled } from '@mui/material';
import { AdsTable } from './AdsTable';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function MyAds() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button variant="contained" onClick={navigateToCreateAd}>
                {locale.myAds.createAd}
            </Button>
            <Query apiCall={() => missionsApi.getMyMissions()} queryKey={['me', 'missions']}>
                {(data) => <AdsTable missions={data.missions} />}
            </Query>
        </Container>
    );

    function navigateToCreateAd() {
        navigate(pathHandler.getRoutePath('AD_CREATION'));
    }
}

export { MyAds };

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));
