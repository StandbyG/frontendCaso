import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//Services.
import { UsuarioService } from '../services/usuario.service';

//RxJS.
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private userService: UsuarioService,
               private router: Router) {}

  canActivate() {
  return true;
  }
  
}
