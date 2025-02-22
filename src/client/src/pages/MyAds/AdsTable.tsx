import {
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { adApiType, missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';
import { IconButton } from '../../components/IconButton';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';
import { Button } from '../../components/Button';
import { variabilize } from '../../locale/utils';
import { locale } from '../../locale';
import { computePublishedOn } from './lib/computePublishedOn';
import { missionStatusType } from '../../types';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { ElementType } from 'react';

const missionStatusMapping: Record<missionStatusType, { IconComponent: ElementType }> = {
    completed: { IconComponent: EventAvailableIcon },
    filled: { IconComponent: AssignmentIndIcon },
    open: { IconComponent: PendingActionsIcon },
};

function AdsTable(props: { missions: adApiType[] }) {
    const deleteMyMissionApiCall = useApiCall({
        apiCall: missionsApi.deleteMyMission,
        successText: 'Mission supprimée',
        queryKeyToInvalidate: ['me', 'missions'],
    });
    const navigate = useNavigate();

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Intitulé</TableCell>
                        <TableCell width="5%">Statut</TableCell>
                        <TableCell width="5%">Nombre de candidatures</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.missions.map((mission) => {
                        const { IconComponent } = missionStatusMapping[mission.status];
                        return (
                            <TableRow key={mission.id}>
                                <TableCell>
                                    <>
                                        <Typography variant="h4">{mission.title}</Typography>
                                        <Typography variant="h6">
                                            {variabilize(locale.myAds.adsTable.publishedOn, {
                                                publishedOn: computePublishedOn(
                                                    mission.publishedAt,
                                                ),
                                            })}
                                        </Typography>
                                    </>
                                </TableCell>
                                <TableCell>
                                    <CenteredContent>
                                        <Tooltip
                                            title={
                                                locale.myAds.adsTable.missionStatusTitle[
                                                    mission.status
                                                ]
                                            }
                                        >
                                            <IconComponent />
                                        </Tooltip>
                                    </CenteredContent>
                                </TableCell>
                                <TableCell>
                                    <CenteredContent>{mission.applicationCount}</CenteredContent>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        disabled={mission.applicationCount === 0}
                                        color="inherit"
                                        variant="outlined"
                                        startIcon={<FindInPageIcon />}
                                        onClick={() => navigateToApplications(mission.id)}
                                        title="Examiner les candidatures"
                                    >
                                        Examiner les candidatures
                                    </Button>
                                    <IconButton
                                        IconComponent={EditIcon}
                                        onClick={() => navigateToEditMission(mission.id)}
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
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );

    function navigateToApplications(missionId: string) {
        navigate(pathHandler.getRoutePath('AD_APPLICATIONS', { missionId }));
    }

    function navigateToEditMission(missionId: string) {
        navigate(pathHandler.getRoutePath('AD_EDITION', { missionId }));
    }
}

const CenteredContent = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
}));
export { AdsTable };
