import { styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { locale } from '../../locale';
import { missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';
import { useState } from 'react';
import { useAlert } from '../../lib/alert';
import { Button } from '../../components/Button';
import { pathHandler } from '../../lib/pathHandler';
import { AdUpsertionForm } from './AdUpsertionForm';
import { skillType } from '../../lib/api/usersApi';
import { dateTextConverter } from '../../lib/dateTextConverter';

function AdCreation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState<string>('');
    const [deadlineTime, setDeadlineTime] = useState<string>('23:59');
    const [requiredSkills, setRequiredSkills] = useState<skillType[]>([]);
    const { displayAlert } = useAlert();
    const navigate = useNavigate();

    const createMissionApiCall = useApiCall({
        apiCall: missionsApi.createAd,
        onSuccess: () => {
            displayAlert({ text: "L'annonce a bien été créée.", variant: 'success' });
            setTitle('');
            navigate(pathHandler.getRoutePath('ADS'));
        },
        queryKeyToInvalidate: ['ads'],
    });

    return (
        <Container>
            <Title>{locale.adUpsertion.addTitle}</Title>

            <AdUpsertionForm
                deadlineDate={deadlineDate}
                requiredSkills={requiredSkills}
                setRequiredSkills={setRequiredSkills}
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
                        Créer une mission
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
            requiredSkills: requiredSkills.map((requiredSkill) => requiredSkill.label),
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

export { AdCreation };
