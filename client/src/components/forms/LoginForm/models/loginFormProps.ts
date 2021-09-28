import {LoginDataForm} from '../../../../models/forms/loginDataForm';

export interface LoginFormProps {
    loginHandler(formData: LoginDataForm): void;
}
