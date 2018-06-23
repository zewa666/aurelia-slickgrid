import { Column, OperatorString, OperatorType, SearchTerm } from './../models/index';
export interface FilterCallbackArg {
    clearFilterTriggered?: boolean;
    columnDef: Column;
    operator?: OperatorType | OperatorString;
    searchTerms?: SearchTerm[] | undefined | null;
}
export declare type FilterCallback = (e: Event | undefined, args: FilterCallbackArg) => void;
