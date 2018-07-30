import { Component, OnInit } from '@angular/core';
import { SessionUtils } from '../../../utils/session-utils/session-utils';
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

  logout(): void {
    SessionUtils.clearCurrentLoggedInUser();
    this.checkForLoggedUser();
  }

  checkForLoggedUser(): void {
    if (SessionUtils.checkIfLogin()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
