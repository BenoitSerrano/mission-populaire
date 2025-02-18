import { styled, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { missionApiType, missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';

import { Button } from '../../components/Button';

const DATA_ROW_HEIGHT = 50;

function MissionsTable(props: { missions: missionApiType[] }) {
    const deleteMyMissionApiCall = useApiCall({
        apiCall: missionsApi.deleteMyMission,
        successText: 'Mission supprimée',
        queryKeyToInvalidate: ['missions'],
    });
    return (
        <Table>
            <MissionsRowContainer>
                {props.missions.map((missionDetail) => (
                    <MissionRow key={missionDetail.id}>
                        <Cell width="20%">{missionDetail.title}</Cell>
                        <Cell width="5%">
                            <Button
                                startIcon={<DeleteForeverIcon />}
                                isLoading={deleteMyMissionApiCall.isLoading}
                                onClick={() => deleteMyMissionApiCall.perform(missionDetail.id)}
                            >
                                Supprimer
                            </Button>
                        </Cell>
                    </MissionRow>
                ))}
            </MissionsRowContainer>
        </Table>
    );
}
export { MissionsTable };

const Table = styled('div')(({ theme }) => ({
    position: 'relative',
    background: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    overflow: 'hidden',
}));

const MissionRow = styled('div')(({ theme }) => ({
    display: 'flex',
    height: DATA_ROW_HEIGHT,
    alignItems: 'center',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.divider}`,
}));
const MissionsRowContainer = styled('div')(({ theme }) => ({
    overflowY: 'auto',
    maxHeight: '94%',
}));
const Cell = styled(Typography)<{ width: string }>(({ width }) => ({ width }));
