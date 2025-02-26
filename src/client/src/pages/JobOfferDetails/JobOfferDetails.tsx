import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { missionsApi } from '../../lib/api/missionsApi';
import { Query } from '../../components/Query';
import { styled, Typography } from '@mui/material';
import { Section } from './Section';
import { ApplicationModal } from './ApplicationModal';
import { Button } from '../../components/Button';
import { RequiredSkills } from '../../components/RequiredSkills';

function JobOfferDetails() {
    const params = useParams<{ missionId: string }>();
    const missionId = params.missionId as string;
    const getJobOfferDetails = () => missionsApi.getJobOfferDetails(missionId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Container>
            <ApplicationModal isOpen={isModalOpen} close={closeModal} missionId={missionId} />
            <Query apiCall={getJobOfferDetails} queryKey={['job-offers', missionId]}>
                {({ jobOffer, application }) => (
                    <MissionContainer>
                        <TitleContainer>
                            <Typography variant="h1">{jobOffer.title}</Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={openModal}
                                disabled={!!application}
                            >
                                Postuler
                            </Button>
                        </TitleContainer>
                        <Section title="Informations importantes">
                            <RequiredSkills jobOffer={jobOffer} />
                        </Section>
                        <Section title="Description de la mission">
                            <Typography>{jobOffer.description}</Typography>
                        </Section>
                    </MissionContainer>
                )}
            </Query>
        </Container>
    );

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }
}

const Container = styled('div')(({ theme }) => ({
    flex: 1,
    padding: theme.spacing(4),
}));

const TitleContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
}));
const MissionContainer = styled('div')(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    border: `solid 1px ${theme.palette.divider}`,
    flex: 1,
    padding: theme.spacing(3),
}));

export { JobOfferDetails };
