import {RegisterDataForm} from '../../../../models/forms/registerDataForm';

export interface RegisterFormProps {
    registerHandler(formData: RegisterDataForm): void;
}
