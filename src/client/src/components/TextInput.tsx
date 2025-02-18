import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

function TextInput(props: {
    setValue: (value: string) => void;
    value: string | number;
    helperText?: string;
    type?: React.InputHTMLAttributes<unknown>['type'];
    placeholder?: string;
    autoFocus?: boolean;
    minRows?: number;
    fullWidth?: boolean;
    disabled?: boolean;
    label: string;
    name?: string;
    isMultiline?: boolean;
    required?: boolean;
    validate?: (value: string) => string | true;
}) {
    const [isTouched, setIsTouched] = useState(false);
    const [errorText, setErrorText] = useState<string | undefined>(undefined);
    return (
        <TextField
            multiline={props.isMultiline}
            minRows={props.minRows}
            onBlur={() => setIsTouched(true)}
            required={props.required}
            type={props.type}
            label={props.label}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            value={props.value}
            helperText={computeHelperText()}
            error={isTouched ? !!errorText : undefined}
            fullWidth={props.fullWidth}
            disabled={props.disabled}
            onChange={onChange}
        />
    );

    function computeHelperText() {
        if (!!errorText) {
            return isTouched ? errorText : undefined;
        }
        return props.helperText;
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.value;
        if (props.validate) {
            const validation = props.validate(newValue);
            if (validation === true) {
                if (errorText !== undefined) {
                    setErrorText(undefined);
                }
            } else {
                if (errorText === undefined) {
                    setErrorText(validation);
                }
            }
        }
        props.setValue(newValue);
    }
}

export { TextInput };
