import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionUtils } from '../../utils/session-utils/session-utils';
import { Input } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public isAdmin: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.checkForLoggedUser();
  }

  checkForLoggedUser(): void {
    if (SessionUtils.checkIfLogin()) {

      if (SessionUtils.getCurrentLoggedInUser().profile === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}

