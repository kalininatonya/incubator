import {FieldValues, UseFormRegister, UseFormSetValue, FieldError} from 'react-hook-form';

export interface FormFieldsProps {
    name: string;
    type?: string;
    isRequired: boolean;
    autoFocus: boolean;
    placeholder: string;
    ref?: string;
    maxValue?: number;
    minValue?: number;
    value?: string | number;
    error?: FieldError;
    setValue?: UseFormSetValue<FieldValues>;
    register: UseFormRegister<FieldValues>;
}