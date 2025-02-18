import { Typography, styled } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { pathHandler } from '../lib/pathHandler';
import { LoadingButton } from '@mui/lab';
import { usersApi } from '../lib/api/usersApi';
import { localSessionHandler } from '../lib/localSessionHandler';
import { useApiCall } from '../lib/useApiCall';
import { TextInput } from '../components/TextInput';

function SignIn() {
    const [actionPopulaireId, setActionPopulaireId] = useState('');
    const navigate = useNavigate();

    const loginApiCall = useApiCall({
        apiCall: usersApi.login,
        onSuccess: (data) => {
            const { token, userInfo } = data;
            localSessionHandler.setToken(token);
            localSessionHandler.setUserInfo(userInfo);

            navigate(pathHandler.getRoutePath('HOME'));
        },
    });

    return (
        <>
            <ContentContainer>
                <Card size="medium">
                    <CardContent onSubmit={handleSubmit}>
                        <TitleContainer>
                            <Typography variant="h2">Se connecter</Typography>
                        </TitleContainer>

                        <FieldsContainer>
                            <FieldContainer>
                                <TextInput
                                    autoFocus
                                    fullWidth
                                    name="actionPopulaireId"
                                    type="text"
                                    label="ID Action Populaire"
                                    value={actionPopulaireId}
                                    setValue={setActionPopulaireId}
                                />
                            </FieldContainer>
                        </FieldsContainer>

                        <LoadingButton
                            loading={loginApiCall.isLoading}
                            type="submit"
                            variant="contained"
                            disabled={!actionPopulaireId}
                        >
                            Se connecter
                        </LoadingButton>
                    </CardContent>
                </Card>
            </ContentContainer>
        </>
    );

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        loginApiCall.perform({ actionPopulaireId });
        event.preventDefault();
    }
}

const ContentContainer = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
});

// const DisplayPasswordLinkContainer = styled('div')({
//     display: 'flex',
//     textDecorationLine: 'underline',
//     alignItems: 'center',
//     justifyContent: 'center',
// });

const CardContent = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
}));

const FieldsContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
}));
const FieldContainer = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(2) }));
const TitleContainer = styled('div')(({ theme }) => ({
    marginBottom: theme.spacing(6),
    textAlign: 'center',
}));

export { SignIn };
