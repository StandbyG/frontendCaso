import { Component } from '@angular/core';
import { Router } from '@angular/router';

//Services.
import { UsuarioService } from '../../services/usuario.service';

//Models.
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: Usuario;

  constructor( private userService: UsuarioService,
               private router: Router ) {
    this.user = userService.user;
  }

  logout() {
    this.userService.logout();
  }

}
