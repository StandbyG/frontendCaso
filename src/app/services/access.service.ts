import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//RxJS.
import {  map } from 'rxjs/operators';

//Models.
import { Usuario } from '../models/usuario.model';
import { Access } from '../models/access.model';

//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class AccessService {

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

  getAccess() {

    const url = `${base_url}/access`;

    return this.http.get<any>(url, this.headers)
      .pipe(
        map(resp => {
          const data = resp.data;
          const access = data.map(
            element => new Access(element.accessID, element.description, element.active)
          );
          return {
            total: data.length,
            access
          };
        })
      )
  }

  insertRol(rol: any) {
    return this.http.post(`${base_url}/roles`, rol, this.headers);
  }

  updateRol(role: any) {
    return this.http.put(`${base_url}/roles/${role.roleID}`, role, this.headers);
  }

}
