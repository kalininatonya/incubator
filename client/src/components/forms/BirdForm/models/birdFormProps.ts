import { BirdDataForm } from '../../../../models/forms/birdDataForm';
import { Incubator } from '../../../../models/incubator';

export interface BirdFormProps {
  isEdit: boolean;
  incubator?: Incubator;
  onSubmit(formData: BirdDataForm): Promise<void>;
}
