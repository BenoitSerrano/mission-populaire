import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { applicationApiType } from '../../lib/api/applicationsApi';

function ApplicationsTable(props: { applications: Array<applicationApiType> }) {
    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Militant·e</TableCell>
                        <TableCell>Date de candidature</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.applications.map((application) => (
                        <TableRow key={application.id}>
                            <TableCell>{application.user.displayName}</TableCell>
                            <TableCell>{application.appliedAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export { ApplicationsTable };
