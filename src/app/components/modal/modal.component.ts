import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


//Interfaces.
import {IModal} from '../../interfaces/modal.interface';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  isLoading: boolean;
  isAccepted: boolean = false;

  onSave = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: IModal
  ) { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAccept(){
    this.isLoading = true;
    this.isAccepted = true;
    
    this.onSave.emit({"rsp":this.isAccepted});
  }

}
