import {warnings} from '../../constants';

export const required = (value: string) => {
  if (value) {
    return undefined;
  }
  return warnings.required;
};

const makeWordForMaxMinLength = (length: number) => {
  const ten = length % 10;
  const hundred = length % 100;

  // 1, 21, 101, 121, но не 11, 111, 211...
  if (ten === 1 && hundred !== 11) {
    return 'символ';
  }

  // 2, 3, 4, 22, 33, 44, 152, 163, 174, но не 12, 13, 14, 112, 213, 314...
  if (ten >= 2 && ten <= 4 && (hundred < 10 || hundred >= 20)) {
    return 'символа';
  }

  return 'символов';
}

export const maxLengthCreator = (maxLength: number) => (value: string): string | undefined => {
  if (value && String(value).length > maxLength) {
    return `Максимальная длина значения - ${maxLength} ${makeWordForMaxMinLength(maxLength)}`;
  }
  return undefined;
};

export const minLengthCreator = (minLength: number) => (value: string): string | undefined => {
  if (value && String(value).length < minLength) {
    return `Минимальная длина значения - ${minLength} ${makeWordForMaxMinLength(minLength)}`;
  }
  return undefined;
}

export const checkValue = (value: string) => {
  if(Number(value) <= 0) {
    return 'Значение должно быть больше 0';
  }
  return undefined;
}
