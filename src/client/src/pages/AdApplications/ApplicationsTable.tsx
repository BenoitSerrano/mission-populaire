import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { applicationApiType } from '../../lib/api/applicationsApi';
import { IconButton } from '../../components/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function ApplicationsTable(props: { applications: Array<applicationApiType> }) {
    const navigate = useNavigate();
    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Militant·e</TableCell>
                        <TableCell>Date de candidature</TableCell>
                        <TableCell width="5%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.applications.map((application) => (
                        <TableRow key={application.id}>
                            <TableCell>{application.user.displayName}</TableCell>
                            <TableCell>{application.appliedAt}</TableCell>
                            <TableCell>
                                <IconButton
                                    title="Examiner la candidature"
                                    IconComponent={VisibilityIcon}
                                    onClick={() => navigateToApplication(application.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    function navigateToApplication(applicationId: string) {
        navigate(pathHandler.getRoutePath('APPLICATION', { applicationId }));
    }
}

export { ApplicationsTable };
