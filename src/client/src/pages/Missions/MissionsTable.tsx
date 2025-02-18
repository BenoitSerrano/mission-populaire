import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { missionApiType, missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';

import { Button } from '../../components/Button';

function MissionsTable(props: { missions: missionApiType[] }) {
    const deleteMyMissionApiCall = useApiCall({
        apiCall: missionsApi.deleteMyMission,
        successText: 'Mission supprimée',
        queryKeyToInvalidate: ['missions'],
    });
    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Titre</TableCell>
                        <TableCell width="10%">Publié le</TableCell>
                        <TableCell width="5%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.missions.map((mission) => (
                        <TableRow key={mission.id}>
                            <TableCell>{mission.title}</TableCell>
                            <TableCell>{mission.publishedAt}</TableCell>
                            <TableCell>
                                <Button
                                    startIcon={<DeleteForeverIcon />}
                                    isLoading={deleteMyMissionApiCall.isLoading}
                                    onClick={() => deleteMyMissionApiCall.perform(mission.id)}
                                >
                                    Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export { MissionsTable };
