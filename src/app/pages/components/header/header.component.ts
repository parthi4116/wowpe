import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ConfermationPopupComponent } from '../confermation-popup/confermation-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userDto: any
  constructor(
    private auth: AuthService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.userDto = this.auth.getUser()
  };

  logout() {
    let message = {
      header: 'Sign Out',
      content: 'Are you sure you want to Log out?'
    }
    const dialogRef = this.dialog.open(ConfermationPopupComponent, {
      width: '400px',
      data: message
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('1');
        
        if (result !== 'no') {
          console.log('2');
          
          this.auth.logout() }
      }
    })

  }
}
