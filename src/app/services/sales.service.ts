import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

//Interfaces.
import { LoadSales } from '../interfaces/cargar-sales.interfaces';

//RxJS.
import { map } from 'rxjs/operators';
import { Invoice } from '../models/core/sales/invoice.model';

@Injectable({
    providedIn: 'root'
})

export class SalesService {

    public sales;

    constructor(private http: HttpClient) {

    }

    get token(): string {
        return localStorage.getItem('token') || '';
    }


    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }

    loadSales(page, search, startDate, endDate) {

        page = page == 0 ? 1 : page;
        const url = `${base_url}/sales?page=${page}&search=${search}&startDate=${startDate}&endDate=${endDate}`;

        return this.http.get<LoadSales>(url, this.headers)
            .pipe(
                map(data => {
                    return {
                        total: data.data.count,
                        sales: data.data.rows,
                        pages: data.pages,
                        perPage: data.perPage,
                        totalAmount:data.totalAmount
                    };
                })
            )
    }

    searchDate(startDate: string, endDate: string) {

        const url = `${base_url}/sales?startDate=${startDate}&endDate=${endDate}`;

        return this.http.get<LoadSales>(url, this.headers)
            .pipe(
                map(data => {
                    return {
                        total: data.data.length,
                        sales: data.data,
                        pages: data.pages,
                        perPage: data.perPage
                    };
                })
            )
    }

    addInvoices(invoice: Invoice) {
        const url = `${base_url}/sales`;
        return this.http.post(url, invoice, this.headers);
    }

    deleteInvoice(salesID:number, userID:number) {
        const url = `${base_url}/sales/${salesID}/${userID}`;
        return this.http.delete(url, this.headers);
    }

}