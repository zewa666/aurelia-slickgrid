import { Column, Formatter } from './../models/index';
import { formatNumber } from './../services/utilities';
import { getValueFromParamsOrFormatterOptions } from './formatterUtilities';

export const dollarFormatter: Formatter = (_row: number, _cell: number, value: any, columnDef: Column, _dataContext: any, grid: any) => {
  const isNumber = (value === null || value === undefined || value === '') ? false : !isNaN(+value);
  const minDecimal = getValueFromParamsOrFormatterOptions('minDecimal', columnDef, grid, 2);
  const maxDecimal = getValueFromParamsOrFormatterOptions('maxDecimal', columnDef, grid, 4);
  const decimalSeparator = getValueFromParamsOrFormatterOptions('decimalSeparator', columnDef, grid, '.');
  const thousandSeparator = getValueFromParamsOrFormatterOptions('thousandSeparator', columnDef, grid, '');
  const displayNegativeNumberWithParentheses = getValueFromParamsOrFormatterOptions('displayNegativeNumberWithParentheses', columnDef, grid, false);

  if (isNumber) {
    return formatNumber(value, minDecimal, maxDecimal, displayNegativeNumberWithParentheses, '$', '', decimalSeparator, thousandSeparator);
  }
  return value;
};
