import { styled, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { locale } from '../../locale';
import { missionsApi } from '../../lib/api/missionsApi';
import { useApiCall } from '../../lib/useApiCall';
import { useState } from 'react';
import { useAlert } from '../../lib/alert';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { pathHandler } from '../../lib/pathHandler';
import { convertDateTextToTimestamp } from './lib/convertDateTextToTimestamp';

function AdCreation() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadlineDate, setDeadlineDate] = useState<string | undefined>();
    const [deadlineTime, setDeadlineTime] = useState<string | undefined>('23:59');
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
            <Title>{locale.adCreation.title}</Title>
            <Form>
                <InputContainer>
                    <TextInput
                        required
                        fullWidth
                        name="title"
                        label={locale.adCreation.form.title}
                        value={title}
                        setValue={setTitle}
                    />
                </InputContainer>
                <InputContainer>
                    <TextInput
                        required
                        minRows={2}
                        isMultiline
                        fullWidth
                        name="description"
                        label={locale.adCreation.form.description}
                        value={description}
                        setValue={setDescription}
                    />
                </InputContainer>
                <InputContainer>
                    <Text>{locale.adCreation.form.deadline.date}</Text>
                    <TextField
                        placeholder="La mission doit être achevée avant le ..."
                        variant="standard"
                        type="date"
                        value={deadlineDate}
                        onChange={onChangeDeadlineDate}
                    />
                    <Text>{locale.adCreation.form.deadline.time}</Text>
                    <TextField
                        placeholder="à ..."
                        variant="standard"
                        type="time"
                        value={deadlineTime}
                        onChange={onChangeDeadlineTime}
                    />
                    .
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

    function onChangeDeadlineDate(event: React.ChangeEvent<HTMLInputElement>) {
        setDeadlineDate(event.target.value);
    }

    function onChangeDeadlineTime(event: React.ChangeEvent<HTMLInputElement>) {
        setDeadlineTime(event.target.value);
    }

    function createMission() {
        const deadline = convertDateTextToTimestamp(`${deadlineDate} ${deadlineTime}`);
        createMissionApiCall.perform({
            title,
            deadline,
            description,
        });
    }
}

const Text = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
}));

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
    display: 'flex',
    alignItems: 'center',
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

export { AdCreation };
