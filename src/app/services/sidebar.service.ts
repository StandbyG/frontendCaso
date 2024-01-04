import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];
  validateAccess(access) {
  return true;
  }

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
    this.menu = [
      /* this.validateAccess("Acceso a Dashboard") ? {
        title: 'Dashboard',
        icon: 'mdi mdi-gauge',
        submenu: [
          { title: 'Main',url: '/' },
          { title: 'rxjs', url: 'rxjs' },
          { title: 'Promesas',url: 'promesas' },
        ]
      } : {}, */
      this.validateAccess("Access to sales") ? {
        title: 'Sales',
        icon: 'mdi mdi-cash',
        submenu: [
          this.validateAccess("Access to my sale") ? { title: 'My sales', url: 'mysales' } : {},
          this.validateAccess("Access to new sale") ? { title: 'New', url: 'newsales' } : {},
          this.validateAccess("Access to estimate") ? { title: 'Estimate', url: 'estimate' } : {},
        ]
      } : {},
      this.validateAccess("Acceso a Mantenimientos") ? {
        title: 'Maintenances',
        icon: 'mdi mdi-settings',
        submenu: [
          this.validateAccess("Acceso a Usuarios") ? { title: 'Users', url: 'users' } : {},
          this.validateAccess("Acceso a Roles") ? { title: 'Roles', url: 'roles' } : {},
          this.validateAccess("Access to setting") ? { title: 'Settings', url: 'setting' } : {}
        ]
      } : {},
      
    ];
    //console.log(this.menu);
  }


}
