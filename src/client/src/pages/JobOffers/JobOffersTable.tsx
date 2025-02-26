import {
    Chip,
    ListItem,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { jobOfferApiType } from '../../lib/api/missionsApi';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '../../components/IconButton';
import { pathHandler } from '../../lib/pathHandler';
import { useNavigate } from 'react-router-dom';
import { MissionTitleCell } from '../../components/MissionTitleCell';

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
                                <RequiredSkillsContainer>
                                    {jobOffer.requiredSkills.map((requiredSkill) => {
                                        return (
                                            <RequiredSkillItem key={requiredSkill.label}>
                                                <Chip label={requiredSkill.value} />
                                            </RequiredSkillItem>
                                        );
                                    })}
                                </RequiredSkillsContainer>
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    IconComponent={VisibilityIcon}
                                    onClick={() => navigateToMissionDetails(jobOffer.id)}
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
const RequiredSkillsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
}));
const RequiredSkillItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    width: 'auto',
    paddingRight: theme.spacing(1),
}));
export { JobOffersTable };
