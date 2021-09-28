import {Incubator} from '../../../../../../models/incubator';

export interface ArchiveIncubatorsProps {
    incubators: Incubator[];
    openModalDeletion(id: number): void;
}