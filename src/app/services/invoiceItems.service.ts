import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;

//Models.
import{InvoiceItems} from '../models/core/sales/invoiceItems.model';

//RxJS.
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InvoiceItemsService {

    public invoiceItems;

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

    addInvoiceItems(invoiceItems: Array<InvoiceItems>){
        const url = `${base_url}/invoiceItem`;

        return this.http.post(url,{"invoicesItems": invoiceItems} , this.headers);
    }

    
}