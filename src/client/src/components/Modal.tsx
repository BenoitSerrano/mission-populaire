import { Modal as MuiModal, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Button } from './Button';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from './IconButton';
import { locale } from '../locale';

type modalSizeType = 'small' | 'large';

function Modal(props: {
    isConfirmDisabled?: boolean;
    children: React.ReactElement | Array<React.ReactElement | boolean>;
    isOpen: boolean;
    close: () => void;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    isConfirmLoading?: boolean;
    title?: string;
    size?: 'small' | 'large';
}) {
    const ModalComponent = modalComponentMapping[props.size || 'large'];
    return (
        <StyledModal open={props.isOpen} onClose={props.close}>
            <ModalComponent>
                {!!props.title && (
                    <ModalHeader>
                        <Typography variant="h3">{props.title}</Typography>
                        <CloseButtonContainer>
                            <IconButton
                                IconComponent={CloseIcon}
                                title={locale.shared.close}
                                onClick={props.close}
                            />
                        </CloseButtonContainer>
                    </ModalHeader>
                )}
                <ModalBody>{props.children}</ModalBody>
                <ModalFooter>
                    <ButtonContainer>
                        <Button fullWidth color="inherit" onClick={onCancel}>
                            {props.cancelButtonLabel || 'Annuler'}
                        </Button>
                    </ButtonContainer>
                    <ButtonContainer>
                        <LoadingButton
                            fullWidth
                            disabled={props.isConfirmDisabled}
                            loading={props.isConfirmLoading}
                            variant="contained"
                            onClick={props.onConfirm}
                        >
                            {props.confirmButtonLabel || 'Confirmer'}
                        </LoadingButton>
                    </ButtonContainer>
                </ModalFooter>
            </ModalComponent>
        </StyledModal>
    );

    function onCancel() {
        if (props.onCancel) {
            props.onCancel();
        } else {
            props.close();
        }
    }
}

const ModalHeader = styled('div')(({ theme }) => ({
    position: 'sticky',
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 10,
}));

const ModalFooter = styled('div')(({ theme }) => ({
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
    padding: theme.spacing(2),
}));

const modalDefaultProperties = {
    borderRadius: '2px',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'auto',
    minHeight: '80%',
    maxHeight: '80%',
};

const SmallModalContent = styled('div')(({ theme }) => ({
    ...modalDefaultProperties,
    minWidth: '35%',
    maxWidth: '35%',
    backgroundColor: theme.palette.background.paper,
}));

const LargeModalContent = styled('div')(({ theme }) => ({
    ...modalDefaultProperties,
    minWidth: '80%',
    maxWidth: '80%',
    backgroundColor: theme.palette.background.paper,
}));

const modalComponentMapping: Record<modalSizeType, any> = {
    small: SmallModalContent,
    large: LargeModalContent,
};

const ModalBody = styled('div')(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
}));

const StyledModal = styled(MuiModal)(({ theme }) => ({
    zIndex: 999,
}));

const ButtonContainer = styled('div')(({ theme }) => ({
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    flex: 1,
}));

const CloseButtonContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
}));

export { Modal };
