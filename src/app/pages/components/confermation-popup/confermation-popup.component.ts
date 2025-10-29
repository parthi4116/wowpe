import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confermation-popup',
  templateUrl: './confermation-popup.component.html',
  styleUrls: ['./confermation-popup.component.scss']
})
export class ConfermationPopupComponent implements OnInit {

  constructor(
    public auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public message: any,
    private dialogRef: MatDialogRef<ConfermationPopupComponent>) { };

  ngOnInit() {
  }
  
yes(){
    this.dialogRef.close('yes');

}
  cancel() {
    this.dialogRef.close('no');
  }
}
