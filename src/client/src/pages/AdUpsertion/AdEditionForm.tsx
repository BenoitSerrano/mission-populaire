import { styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { locale } from '../../locale';
import { missionApiType, missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';
import { useState } from 'react';
import { useAlert } from '../../lib/alert';
import { Button } from '../../components/Button';
import { pathHandler } from '../../lib/pathHandler';
import { dateTextConverter } from './lib/dateTextConverter';
import { AdUpsertionForm } from './AdUpsertionForm';

function AdEditionForm(props: { mission: missionApiType }) {
    const [title, setTitle] = useState(props.mission.title);
    const [description, setDescription] = useState(props.mission.description);
    const deadline = dateTextConverter.convertTimestampToDateText(
        new Date(props.mission.deadline).getTime(),
    );
    const [deadlineDate, setDeadlineDate] = useState<string>(deadline.date);
    const [deadlineTime, setDeadlineTime] = useState<string>(deadline.time);
    const { displayAlert } = useAlert();
    const navigate = useNavigate();

    const createMissionApiCall = useApiCall({
        apiCall: missionsApi.createMission,
        onSuccess: () => {
            displayAlert({ text: 'Vous avez bien créé une mission', variant: 'success' });
            setTitle('');
            navigate(pathHandler.getRoutePath('MY_ADS'));
        },
        queryKeyToInvalidate: ['me', 'missions'],
    });

    return (
        <Container>
            <Title>{locale.adUpsertion.editTitle}</Title>

            <AdUpsertionForm
                deadlineDate={deadlineDate}
                deadlineTime={deadlineTime}
                description={description}
                title={title}
                setDeadlineDate={setDeadlineDate}
                setDeadlineTime={setDeadlineTime}
                setDescription={setDescription}
                setTitle={setTitle}
            />
            <Footer>
                <FooterContent>
                    <Button
                        variant="contained"
                        isLoading={createMissionApiCall.isLoading}
                        onClick={createMission}
                    >
                        Éditer l'annonce
                    </Button>
                </FooterContent>
            </Footer>
        </Container>
    );

    function createMission() {
        const deadline = dateTextConverter.convertDateTextToTimestamp(
            `${deadlineDate} ${deadlineTime}`,
        );
        createMissionApiCall.perform({
            title,
            deadline,
            description,
        });
    }
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    padding: theme.spacing(4),
    flex: 1,
}));

const Footer = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    background: theme.palette.background.paper,
    display: 'flex',
    width: '100%',
}));
const FooterContent = styled('div')(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({}));

export { AdEditionForm };
