import { Typography } from '@mui/material';
import { useState } from 'react';
import { Modal } from '../../components/Modal';
import { TextInput } from '../../components/TextInput';
import { useApiCall } from '../../lib/useApiCall';
import { applicationsApi } from '../../lib/api/applicationsApi';

function ApplicationModal(props: { close: () => void; isOpen: boolean; missionId: string }) {
    const [content, setContent] = useState('');
    const createApplicationApiCall = useApiCall({
        apiCall: applicationsApi.createApplication,
        successText: 'Votre candidature a été prise en compte !',
        queryKeyToInvalidate: ['job-offers', props.missionId],
        onSuccess: () => {
            setContent('');
            props.close();
        },
    });
    return (
        <Modal
            isOpen={props.isOpen}
            close={props.close}
            onConfirm={onConfirm}
            isConfirmLoading={createApplicationApiCall.isLoading}
            isConfirmDisabled={!content}
        >
            <Typography>Pourquoi votre profil est-il pertinent pour cette mission ?</Typography>
            <TextInput
                isMultiline
                label="Motivation"
                setValue={setContent}
                value={content}
                autoFocus
                minRows={10}
                required
            />
        </Modal>
    );

    function onConfirm() {
        createApplicationApiCall.perform({ missionId: props.missionId, content });
    }
}

export { ApplicationModal };
