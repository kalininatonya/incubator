import {Incubator} from '../../../../../../models/incubator';

export interface ActualIncubatorsProps {
    incubators: Incubator[];
    archiveLength: number | null;
    openModalDeletion(id: number): void;
}