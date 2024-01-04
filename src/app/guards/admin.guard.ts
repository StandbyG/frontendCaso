import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//Services.
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UsuarioService,
    private router: Router) { }

  canActivate(): boolean {
    if (this.userService.role === 'ADMINISTRATOR' || this.userService.role === 'MASTER') {
      return true;
    } else {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
  }

}
