import {Setting} from '../../models/settings/setting';
import {Incubator} from '../../models/settings/incubator';

//То что получаем с бека после запроса настроек инкубации на каждый день
export interface SettingsAPI {
    userId: number;
    incubator: Incubator;
    settings: Setting[];
}