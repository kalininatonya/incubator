import {Humidity} from './humidity';
import {Temperature} from './temperature';

export interface Setting {
    day: number;
    startDateTime: Date;
    endDateTime: Date;
    temperature: Temperature;
    humidity: Humidity;
    description: string;
    isActual: boolean;
}