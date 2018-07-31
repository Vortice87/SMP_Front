import { Component, OnInit } from '@angular/core';
import { UserAccountDTO } from '../../models/userAccountDTO';

// import the authenticationService
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ComunicationService } from '../../services/shared/comunication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  private user: UserAccountDTO;
  private loginError: boolean;

  constructor(private authentication: AuthenticationService, private router: Router,
              private comunicationService: ComunicationService) { }

  ngOnInit() {
    this.loginError = false;
    this.checkIfLogin();
  }

  // Checks if user is logged in
  private checkIfLogin(): void {
    if (sessionStorage.getItem('llud;')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  login(): void {

    this.authentication.authlogin(this.username, this.password).subscribe(
      (response: UserAccountDTO) => {
        this.user = response;

        if (this.user != null) {
          this.loginError = false;
          this.comunicationService.sendUser(this.user);
          this.router.navigate(['home']);

        } else {
          this.loginError = true;
        }
      }
    );
  }
}
