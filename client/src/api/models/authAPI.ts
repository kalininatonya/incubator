import {MessageAPI} from './messageAPI';

//То что получаем с бека
export interface LoginAPI {
  token: string;
  userId: number;
  login: string;
}

//То что получаем с бека
export interface RegisterAPI {
  message: MessageAPI;
  token: string;
  userId: number;
  login: string;
}