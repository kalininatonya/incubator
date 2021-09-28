import {Bird} from '../bird';

export interface Incubator {
    id: number;
    breed: string;
    count: number;
    description: string;
    dateTime: Date;
    bird: Bird
    daysLeft: number;
    isActual: boolean;
    finishDateTime: Date;
}