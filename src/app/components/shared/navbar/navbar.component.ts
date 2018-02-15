import { Component, OnInit } from '@angular/core';
import { SessionUtilsModule } from '../../../utils/session-utils/session-utils.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout():void{
    SessionUtilsModule.clearCurrentLoggedInUser();
    this.checkForLoggedUser();
  }

  checkForLoggedUser():void
  {
    if (SessionUtilsModule.checkIfLogin()) {

      this.router.navigate(["/home"]);

    }else{

      this.router.navigate(["/login"]);      

    }
  }

}
