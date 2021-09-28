import {Bird} from '../../../../models/bird';
import {FormFieldsProps} from '../../../../models/forms/formFieldsProps';

export interface SelectProps extends FormFieldsProps {
    options: Bird[];
}