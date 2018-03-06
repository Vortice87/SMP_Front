import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionUtilsModule } from '../../utils/session-utils/session-utils.module';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  isAdmin: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.checkForLoggedUser();
  }

  checkForLoggedUser():void
  {
    if (SessionUtilsModule.checkIfLogin()) {

      if(SessionUtilsModule.getCurrentLoggedInUser().profile == "admin"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }

    }else{

      this.router.navigate(["/login"]);      

    }
  }



}

