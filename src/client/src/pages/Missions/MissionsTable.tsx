import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { missionApiType } from '../../lib/api/missionsApi';

function MissionsTable(props: { missions: missionApiType[] }) {
    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Titre</TableCell>
                        <TableCell width="10%">Publié le</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.missions.map((mission) => (
                        <TableRow key={mission.id}>
                            <TableCell>{mission.title}</TableCell>
                            <TableCell>{mission.publishedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export { MissionsTable };
