import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class ReportService {

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


  exportDataMySales(search: string, startDate: string, endDate: string){
    const url = `${base_url}/sales/exports?search=${search}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get(url, {
      ...this.headers,
      responseType: 'blob'
    });
  }
  


}
