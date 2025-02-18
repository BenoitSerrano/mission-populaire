import { styled, Typography } from '@mui/material';
import { locale } from '../../locale';
import { missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';
import { useState } from 'react';
import { useAlert } from '../../lib/alert';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useNavigate } from 'react-router-dom';
import { pathHandler } from '../../lib/pathHandler';

function MissionCreation() {
    const [title, setTitle] = useState('');
    const { displayAlert } = useAlert();
    const navigate = useNavigate();

    const createMissionApiCall = useApiCall({
        apiCall: missionsApi.createMission,
        onSuccess: () => {
            displayAlert({ text: 'Vous avez bien créé une mission', variant: 'success' });
            setTitle('');
            navigate(pathHandler.getRoutePath('MISSIONS'));
        },
        queryKeyToInvalidate: ['missions'],
    });

    return (
        <Container>
            <Title>{locale.missionCreation.title}</Title>
            <Form>
                <InputContainer>
                    <TextInput
                        name="title"
                        label={locale.missionCreation.form.title}
                        value={title}
                        setValue={setTitle}
                    />
                </InputContainer>
            </Form>
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
        createMissionApiCall.perform({
            title,
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
const Form = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(2),
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
}));
const InputContainer = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    ':not(:last-child)': {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
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

export { MissionCreation };
