import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { adApiType, missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';

import { IconButton } from '../../components/IconButton';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';
import { Button } from '../../components/Button';

function AdsTable(props: { missions: adApiType[] }) {
    const deleteMyMissionApiCall = useApiCall({
        apiCall: missionsApi.deleteMyMission,
        successText: 'Mission supprimée',
        queryKeyToInvalidate: ['missions'],
    });
    const navigate = useNavigate();

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Titre</TableCell>
                        <TableCell width="10%">Publié le</TableCell>
                        <TableCell width="25%"></TableCell>
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
                                    onClick={() => {}}
                                    title="Examiner les candidatures"
                                >
                                    Examiner les candidatures
                                </Button>
                                <IconButton
                                    IconComponent={DeleteForeverIcon}
                                    onClick={() => navigateToMissionDetails(mission.id)}
                                    title="Éditer l'annonce"
                                />
                                <IconButton
                                    IconComponent={DeleteForeverIcon}
                                    onClick={() => deleteMyMissionApiCall.perform(mission.id)}
                                    color="error"
                                    title="Supprimer l'annonce"
                                    isLoading={deleteMyMissionApiCall.isLoading}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    function navigateToMissionDetails(missionId: string) {
        navigate(pathHandler.getRoutePath('MISSION_DETAILS', { missionId }));
    }
}
export { AdsTable };
