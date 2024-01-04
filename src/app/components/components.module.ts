import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//
import { ModalComponent } from './modal/modal.component'


// Angular Material.
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { DialogComponent } from './dialog/dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';





@NgModule({
  declarations: [
    ModalComponent,
    DialogComponent,
    DialogBodyComponent
  ],
  exports: [
    ModalComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class ComponentsModule { }
