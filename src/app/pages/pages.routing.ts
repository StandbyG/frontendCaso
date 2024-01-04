import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Maintenance
import { AdminGuard } from '../guards/admin.guard';

//Sales

//Guards
import { AuthGuard } from '../guards/auth.guard';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent},

        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }


