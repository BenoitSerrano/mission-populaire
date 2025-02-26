import { ElementType } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { applicationStatusType } from '../types';
import { Tooltip } from '@mui/material';
import { locale } from '../locale';

const applicationStatusIconMapping: Record<
    applicationStatusType,
    { IconComponent: ElementType; color: 'success' | 'error' | 'warning' }
> = {
    accepted: { IconComponent: CheckIcon, color: 'success' },
    declined: { IconComponent: ClearIcon, color: 'error' },
    pending: { IconComponent: HourglassEmptyIcon, color: 'warning' },
};

function ApplicationStatusIcon(props: {
    applicationStatus: applicationStatusType;
    fontSize: 'medium' | 'large';
}) {
    const { IconComponent, color } = applicationStatusIconMapping[props.applicationStatus];
    return (
        <Tooltip title={locale.application.applicationStatusTitle[props.applicationStatus]}>
            <IconComponent fontSize={props.fontSize} color={color} />
        </Tooltip>
    );
}

export { ApplicationStatusIcon };
