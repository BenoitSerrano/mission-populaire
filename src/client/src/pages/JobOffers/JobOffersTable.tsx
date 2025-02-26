import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { jobOfferApiType } from '../../lib/api/missionsApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '../../components/IconButton';
import { pathHandler } from '../../lib/pathHandler';
import { useNavigate } from 'react-router-dom';
import { MissionTitleCell } from '../../components/MissionTitleCell';
import { RequiredSkills } from '../../components/RequiredSkills';

function JobOffersTable(props: { jobOffers: jobOfferApiType[] }) {
    const navigate = useNavigate();

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell width="30%">Titre</TableCell>
                        <TableCell>Compétences requises</TableCell>
                        <TableCell width="5%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.jobOffers.map((jobOffer) => (
                        <TableRow key={jobOffer.id}>
                            <MissionTitleCell mission={jobOffer} />
                            <TableCell>
                                <RequiredSkills jobOffer={jobOffer} />
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    IconComponent={VisibilityIcon}
                                    onClick={() => navigateToJobOfferDetails(jobOffer.id)}
                                    title="Voir l'offre"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    function navigateToJobOfferDetails(missionId: string) {
        const path = pathHandler.getRoutePath('JOB_OFFER_DETAILS', { missionId });
        navigate(path);
    }
}

export { JobOffersTable };
