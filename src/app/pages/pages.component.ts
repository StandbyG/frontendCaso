import { Component, OnInit } from '@angular/core';


//Services 
import { SidebarService } from '../services/sidebar.service';


// Declarations
declare function customInitFunctions();


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor(private sidebarService: SidebarService ) { }

  ngOnInit(): void {
    customInitFunctions();
    this.sidebarService.cargarMenu();
  }

}
