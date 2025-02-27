import { styled } from '@mui/material';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function AdsMenu() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button variant="contained" onClick={navigateToCreateAd}>
                {locale.ads.createAd}
            </Button>
        </Container>
    );

    function navigateToCreateAd() {
        navigate(pathHandler.getRoutePath('AD_CREATION'));
    }
}

const Container = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
}));
export { AdsMenu };
