import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionUtilsModule } from '../../utils/session-utils/session-utils.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
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

