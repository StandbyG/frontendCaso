import {Invoice} from '../models/core/sales/invoice.model'
;
export interface LoadSales {
    [x: string]: any;
    total: number;
    sales: Invoice[];
}