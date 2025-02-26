import { Chip, ListItem, Menu, MenuItem, styled, TextField, Typography } from '@mui/material';
import { locale } from '../../locale';
import { TextInput } from '../../components/TextInput';
import { IconButton } from '../../components/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { skillType, usersApi } from '../../lib/api/usersApi';
import { Query } from '../../components/Query';

function AdUpsertionForm(props: {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    deadlineDate: string;
    setDeadlineDate: (deadlineDate: string) => void;
    deadlineTime: string;
    setDeadlineTime: (deadlineTime: string) => void;
    requiredSkills: skillType[];
    setRequiredSkills: (requiredSkills: skillType[]) => void;
}) {
    const [skillMenuAnchorEl, setSkillMenuAnchorEl] = useState<null | HTMLElement>(null);
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
                <Row>
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
                </Row>
            </InputContainer>
            <InputContainer>
                <Query queryKey={['available-skills']} apiCall={usersApi.getAvailableSkills}>
                    {(availableSkills) => (
                        <>
                            <RequiredSkillTextContainer>
                                <Typography>
                                    {locale.adUpsertion.form.requiredSkills.title} :
                                </Typography>
                                <IconButton
                                    IconComponent={AddCircleOutlineOutlinedIcon}
                                    onClick={openSkillMenu}
                                    title={locale.adUpsertion.form.requiredSkills.add}
                                />
                            </RequiredSkillTextContainer>
                            <Menu
                                id="skill-menu"
                                anchorEl={skillMenuAnchorEl}
                                open={!!skillMenuAnchorEl}
                                onClose={closeSkillMenu}
                            >
                                {availableSkills
                                    .filter((availableSkill) =>
                                        props.requiredSkills.every(
                                            (requiredSkill) =>
                                                requiredSkill.label !== availableSkill.label,
                                        ),
                                    )
                                    .map((availableSkill) => (
                                        <MenuItem
                                            key={availableSkill.label}
                                            onClick={buildAddRequiredSkill(availableSkill)}
                                        >
                                            {availableSkill.value}
                                        </MenuItem>
                                    ))}
                            </Menu>

                            <RequiredSkillsContainer>
                                {props.requiredSkills.map((requiredSkill) => {
                                    return (
                                        <RequiredSkillItem key={requiredSkill.label}>
                                            <Chip
                                                label={requiredSkill.value}
                                                onDelete={buildRemoveRequiredSkill(requiredSkill)}
                                            />
                                        </RequiredSkillItem>
                                    );
                                })}
                            </RequiredSkillsContainer>
                        </>
                    )}
                </Query>
            </InputContainer>
        </Form>
    );

    function openSkillMenu(event: MouseEvent<HTMLElement>) {
        setSkillMenuAnchorEl(event.currentTarget);
    }

    function closeSkillMenu() {
        setSkillMenuAnchorEl(null);
    }

    function buildAddRequiredSkill(requiredSkillToAdd: skillType) {
        return () => {
            const newRequiredSkills = [...props.requiredSkills, requiredSkillToAdd];
            props.setRequiredSkills(newRequiredSkills);
            closeSkillMenu();
        };
    }

    function buildRemoveRequiredSkill(requiredSkillToRemove: skillType) {
        return () => {
            const newRequiredSkills = props.requiredSkills.filter(
                (requiredSkill) => requiredSkill.label !== requiredSkillToRemove.label,
            );
            props.setRequiredSkills(newRequiredSkills);
        };
    }

    function onChangeDeadlineDate(event: ChangeEvent<HTMLInputElement>) {
        props.setDeadlineDate(event.target.value);
    }

    function onChangeDeadlineTime(event: ChangeEvent<HTMLInputElement>) {
        props.setDeadlineTime(event.target.value);
    }
}

const Text = styled(Typography)(({ theme }) => ({
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
}));

const Row = styled('div')(({ theme }) => ({ display: 'flex', alignItems: 'center' }));

const RequiredSkillsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
}));
const RequiredSkillItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    width: 'auto',
    paddingRight: theme.spacing(1),
}));

const RequiredSkillTextContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    minHeight: '50px',
    alignItems: 'center',
}));

const Form = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: theme.spacing(3),
    flexDirection: 'column',
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
}));
const InputContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    ':not(:first-child)': {
        paddingTop: theme.spacing(3),
    },
    ':not(:last-child)': {
        paddingBottom: theme.spacing(3),
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
}));

export { AdUpsertionForm };
