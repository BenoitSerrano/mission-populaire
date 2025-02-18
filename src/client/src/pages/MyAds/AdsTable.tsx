import {
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
                        <TableCell>Intitulé</TableCell>
                        <TableCell width="30%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.missions.map((mission) => (
                        <TableRow key={mission.id}>
                            <TableCell>
                                <TitleContainer>
                                    <Typography variant="h4">{mission.title}</Typography>
                                    <Typography variant="h6">
                                        {variabilize(locale.myAds.adsTable.publishedOn, {
                                            publishedOn: computePublishedOn(mission.publishedAt),
                                        })}
                                    </Typography>
                                </TitleContainer>
                            </TableCell>
                            <TableCell>
                                <Button
                                    color="inherit"
                                    variant="outlined"
                                    startIcon={<FindInPageIcon />}
                                    onClick={() => {}}
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    function navigateToEditMission(missionId: string) {
        navigate(pathHandler.getRoutePath('AD_EDITION', { missionId }));
    }
}

const TitleContainer = styled('div')(({ theme }) => ({}));
export { AdsTable };
