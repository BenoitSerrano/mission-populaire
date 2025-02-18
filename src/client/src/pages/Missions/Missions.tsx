import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { styled } from '@mui/material';
import { MissionsTable } from './MissionsTable';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function Missions() {
    const navigate = useNavigate();

    return (
        <Container>
            <Button onClick={navigateToAddMission}>{locale.missions.createMission}</Button>
            <Query apiCall={() => missionsApi.getMissions({})} queryKey={['missions']}>
                {(data) => <MissionsTable missions={data.missions} />}
            </Query>
        </Container>
    );

    function navigateToAddMission() {
        navigate(pathHandler.getRoutePath('MISSION_CREATION'));
    }
}

export { Missions };

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));
