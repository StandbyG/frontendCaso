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

export class DetailSaleService {

    public detailsales;

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


    getDetails(id:number){
        const url = `${base_url}/sales/detailsale?id=${id}`;

        return this.http.get<any>(url, this.headers);
        
    }

}