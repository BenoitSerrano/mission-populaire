import { styled } from '@mui/material';
import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { MissionsTable } from './MissionsTable';
import { userInfoType } from '../../types';

function Missions(props: { userInfo: userInfoType }) {
    return (
        <Container>
            <Query apiCall={() => missionsApi.getMissions({})} queryKey={['missions']}>
                {(data) => <MissionsTable missions={data.missions} />}
            </Query>
        </Container>
    );
}

export { Missions };

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));
