import { Component, OnInit } from '@angular/core';
import { UserAccountDTO } from '../../models/userAccountDTO';

// import the authenticationService
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  private UserAccountDTO: UserAccountDTO;
  private loginError: boolean;

  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.loginError = false;
    this.checkIfLogin();
  }

  // Checks if user is logged in
  private checkIfLogin(): void {
    if (localStorage.getItem('loggedInUser')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  login(): void {

    this.authentication.authlogin(this.username, this.password).subscribe(
      (response: UserAccountDTO) => {
        this.UserAccountDTO = response;

        if (this.UserAccountDTO != null) {
          this.loginError = false;
          localStorage.setItem('loggedInUser', JSON.stringify(response));

          this.router.navigate(['home']);

        } else {
          this.loginError = true;
        }
      }
    );
  }
}
