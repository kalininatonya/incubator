import {Incubator} from '../../../../../../models/incubator';

export interface IncubatorProps {
    incubator: Incubator
    openModalDeletion(id: number): void;
}