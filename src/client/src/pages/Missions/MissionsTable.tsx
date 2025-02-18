import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { missionApiType } from '../../lib/api/missionsApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '../../components/IconButton';
import { pathHandler } from '../../lib/pathHandler';
import { useNavigate } from 'react-router-dom';

function MissionsTable(props: { missions: missionApiType[] }) {
    const navigate = useNavigate();

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
                                <IconButton
                                    IconComponent={VisibilityIcon}
                                    onClick={() => navigateToMissionDetails(mission.id)}
                                    title="Voir la mission"
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
export { MissionsTable };
