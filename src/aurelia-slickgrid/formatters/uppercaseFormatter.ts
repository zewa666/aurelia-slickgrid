import { Formatter } from './../models/index';

export const uppercaseFormatter: Formatter = (_row: number, _cell: number, value: string | any): string => {
  // make sure the value is a string
  if (value !== undefined && typeof value !== 'string') {
    value = value + '';
  }
  return value ? value.toUpperCase() : '';
};
