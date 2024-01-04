import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//JWT.
import jwt_decode from "jwt-decode";

//RxJS.
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

// Interfaces.
import { LoginForm } from '../interfaces/login-form.interface';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

//Models.
import { Usuario } from '../models/usuario.model';

//Enviroments.
import { environment } from '../../environments/environment';
const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public user: Usuario;

  constructor(private http: HttpClient,
    private router: Router,
    private ngZone: NgZone) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): any {
    return this.user;
  }

  get uid(): number {
    return this.user.userID || null;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }



  saveLocalStorage(token: string) {

    localStorage.setItem('token', token);

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('expMenu');



    this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
    })

  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const payload: any = jwt_decode(resp.jwttoken);
        const { userID,  nombre} = payload.user;
        this.user = new Usuario(userID, nombre);
        this.saveLocalStorage(resp.jwttoken);
        return true;
      }),
      catchError(error => of(false))
    );

  }

  decodeToken(): number{
    if(!!localStorage.getItem('token')){ // We check that the data exists.
      const payload: any = jwt_decode(localStorage.getItem('token'));
      return payload.user.userID;
    }else{
      return null;
    }
  }

  updateProfile(data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      // role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);

  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/authenticate`, formData)
      .pipe(
        tap((resp: any) => {
          if (resp.jwttoken) {
            const payload: any = jwt_decode(resp.jwttoken);
            console.log(payload)
            const { userID ,nombre  } = payload;
            this.user = new Usuario(userID, nombre);
            this.saveLocalStorage(resp.jwttoken);
          }
          return resp;
        })
      );

  }


  loadUsers(page, search) {

    page = page == 0 ? 1 : page;
    const url = `${base_url}/users?page=${page}&search=${search}`;

    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map(data => {
          return {
            total: data.data.count,
            users: data.data.rows,
            pages: data.pages,
            perPage: data.perPage
          };
        })
      )
  }

  deleteUser(user: Usuario) {
    const url = `${base_url}/users/${user.userID}`;
    return this.http.delete(url, this.headers);
  }

  updateUser(user: Usuario) {
    return this.http.put(`${base_url}/users/${user.userID}`, user, this.headers);
  }

  insertUser(user: Usuario) {
    return this.http.post(`${base_url}/users`, user, this.headers);
  }



}
