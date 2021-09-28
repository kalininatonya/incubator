import {FieldValues} from 'react-hook-form';

//Для useForm
export interface BirdDataForm extends FieldValues {
    count?: number;
    date?: string;
    time?: string;
    bird?: string;
    breed?: string;
    description?: string;
}
