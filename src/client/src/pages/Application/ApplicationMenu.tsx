import { styled } from '@mui/material';
import { Button } from '../../components/Button';
import { locale } from '../../locale';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useApiCall } from '../../lib/useApiCall';
import { applicationApiType, applicationsApi } from '../../lib/api/applicationsApi';

function ApplicationMenu(props: {
    application: applicationApiType;
    missionId: string;
    userId: string;
}) {
    const pickApplicationApiCall = useApiCall({
        apiCall: applicationsApi.pickApplication,
        successText: 'Votre annonce a bien été pourvue',
        queryKeyToInvalidate: ['job-offer-applications', props.application.id],
    });

    return (
        <Container>
            <Button
                disabled={props.application.status !== 'pending'}
                variant="contained"
                onClick={pickCandidate}
                startIcon={<HowToRegIcon />}
            >
                {locale.application.pick}
            </Button>
        </Container>
    );

    function pickCandidate() {
        // eslint-disable-next-line no-restricted-globals
        const hasConfirmed = confirm('Souhaitez-vous confier la mission à ce.tte candidat.e ?');
        if (hasConfirmed) {
            pickApplicationApiCall.perform({
                missionId: props.missionId,
                userId: props.userId,
                applicationId: props.application.id,
            });
        }
    }
}

const Container = styled('div')(({ theme }) => ({
    display: 'flex',
}));

export { ApplicationMenu };
