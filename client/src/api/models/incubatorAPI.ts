import {Bird} from '../../models/bird';
import {Temperature} from '../../models/settings/temperature';
import {Humidity} from '../../models/settings/humidity';

//То что получаем с бека после добавления инкубатора
export interface IncubatorAPI {
    id: number;
    userId: number;
    bird: Bird;
    breed: string;
    count: number;
    description: string;
    dateTime: Date;
    daysLeft: number;
    isActual: boolean;
    finishDateTime: Date;
    temperature: Temperature | null;
    humidity: Humidity | null;
}

