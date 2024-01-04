import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//RxJS.
import { map } from 'rxjs/operators';

//Models.
import { Rol } from '../models/roles.model';

//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class RolesService {

  public rol: Rol;

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



  getRolesModal() {
    const url = `${base_url}/roles/modal`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map(resp => {
          const data = resp.data;
          const roles = data.map(
            rol => new Rol(rol.roleID, rol.description, rol.active, rol.accessRole)
          );
          return {
            total: data.length,
            roles
          };
        })
      )
  }

  getRoles(page, search) {
    
    page = page == 0 ? 1 : page;
    const url = `${base_url}/roles?page=${page}&search=${search}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map(resp => {
          console.log('res: ', resp);
          const data = resp.data.rows;
          const roles = data.map(
            rol => new Rol(rol.roleID, rol.description, rol.active, rol.accessRole)
          );
          return {
            total: resp.data.count,
            roles,
            perPage : resp.perPage
          };
        })
      )
  }

  getRoleById(roleID) {
    const url = `${base_url}/roles/${roleID}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map(resp => {
          const data = resp.data;
          return data;
        })
      )
  }

  deleteRolByID(roleID) {
    const url = `${base_url}/roles/${roleID}`;
    return this.http.delete<any>(url, this.headers);
  }

  updateRol(rol: Rol) {
    return this.http.put(`${base_url}/roles/${rol.roleID}`, rol, this.headers);
  }


}
