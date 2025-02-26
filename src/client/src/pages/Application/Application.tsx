import { useParams } from 'react-router-dom';
import { applicationsApi } from '../../lib/api/applicationsApi';
import { Query } from '../../components/Query';
import { styled, Typography } from '@mui/material';
import { variabilize } from '../../locale/utils';
import { locale } from '../../locale';
import { dateTextConverter } from '../../lib/dateTextConverter';

function Application() {
    const params = useParams<{ applicationId: string }>();
    const applicationId = params.applicationId as string;
    const getJobOfferApplication = () => applicationsApi.getJobOfferApplication({ applicationId });
    return (
        <Query
            apiCall={getJobOfferApplication}
            queryKey={['job-offer-applications', applicationId]}
        >
            {({ application, jobOffer, user }) => (
                <Container>
                    <Page>
                        <PageContent>
                            <TitleContainer>
                                <Title variant="h2">{jobOffer.title}</Title>
                            </TitleContainer>
                            <HeaderContainer>
                                <UserDetailContainer>
                                    <Typography variant="h3">{user.displayName}</Typography>
                                </UserDetailContainer>
                                <Typography variant="h6">
                                    {variabilize(locale.application.appliedAt, {
                                        appliedAt: dateTextConverter.convertDateToReadableText(
                                            new Date(application.appliedAt),
                                        ),
                                    })}
                                </Typography>
                            </HeaderContainer>
                            <BodyContainer>
                                <QuestionContainer>
                                    <QuestionTitle>
                                        Pourquoi votre profil est-il pertinent pour cette mission ?
                                    </QuestionTitle>
                                    <QuestionAnswer>{application.content}</QuestionAnswer>
                                </QuestionContainer>
                            </BodyContainer>
                        </PageContent>
                    </Page>
                </Container>
            )}
        </Query>
    );
}

const Container = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const TitleContainer = styled('div')(({ theme }) => ({
    flex: 1,
    justifyContent: 'center',
    display: 'flex',
    marginBottom: theme.spacing(2),
}));
const UserDetailContainer = styled('div')(({ theme }) => ({}));
const HeaderContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(6),
}));

const QuestionContainer = styled('div')(({ theme }) => ({ marginBottom: theme.spacing(2) }));
const QuestionTitle = styled(Typography)(({ theme }) => ({ marginBottom: theme.spacing(1) }));
const QuestionAnswer = styled(Typography)(({ theme }) => ({}));

const BodyContainer = styled('div')(({ theme }) => ({ display: 'flex' }));
const Title = styled(Typography)(({ theme }) => ({}));
const Page = styled('div')(({ theme }) => ({
    background: theme.palette.common.white,
    color: theme.palette.common.black,
    display: 'flex',
    border: `solid 1px ${theme.palette.common.black}`,
    borderRadius: '3px',
    width: '60%',
    height: '95%',
}));
const PageContent = styled('div')(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(3),
}));

export { Application };
