import { styled, TextField, Typography } from '@mui/material';
import { locale } from '../../locale';
import { TextInput } from '../../components/TextInput';

function AdUpsertionForm(props: {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    deadlineDate: string;
    setDeadlineDate: (deadlineDate: string) => void;
    deadlineTime: string;
    setDeadlineTime: (deadlineTime: string) => void;
}) {
    return (
        <Form>
            <InputContainer>
                <TextInput
                    required
                    fullWidth
                    name="title"
                    label={locale.adUpsertion.form.title}
                    value={props.title}
                    setValue={props.setTitle}
                />
            </InputContainer>
            <InputContainer>
                <TextInput
                    required
                    minRows={2}
                    isMultiline
                    fullWidth
                    name="description"
                    label={locale.adUpsertion.form.description}
                    value={props.description}
                    setValue={props.setDescription}
                />
            </InputContainer>
            <InputContainer>
                <Text>{locale.adUpsertion.form.deadline.date}</Text>
                <TextField
                    placeholder="La mission doit être achevée avant le ..."
                    variant="standard"
                    type="date"
                    value={props.deadlineDate}
                    onChange={onChangeDeadlineDate}
                />
                <Text>{locale.adUpsertion.form.deadline.time}</Text>
                <TextField
                    placeholder="à ..."
                    variant="standard"
                    type="time"
                    value={props.deadlineTime}
                    onChange={onChangeDeadlineTime}
                />
                .
            </InputContainer>
        </Form>
    );

    function onChangeDeadlineDate(event: React.ChangeEvent<HTMLInputElement>) {
        props.setDeadlineDate(event.target.value);
    }

    function onChangeDeadlineTime(event: React.ChangeEvent<HTMLInputElement>) {
        props.setDeadlineTime(event.target.value);
    }
}

const Text = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
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

export { AdUpsertionForm };
