import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../../models/userAccount';

//import the authenticationService
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username : string;
  public password : string;
  private userAccount: UserAccount;
  private loginError : boolean = true;

  constructor(private authentication: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.checkIfLogin();
  }

    //Checks if user is logged in
    private checkIfLogin() : void 
    {
      if(localStorage.getItem("loggedInUser"))
      {
        this.router.navigate(["home"]);
      }
      else
      {
        this.router.navigate(["login"]);
      }
    }

  login():void
  {
    this.authentication.authlogin(this.username,this.password).subscribe(
      (response: UserAccount) =>
      {
        this.userAccount = response;
        
        if(this.userAccount != null){
          this.loginError = true;
          localStorage.setItem("loggedInUser", JSON.stringify(response));
          
          this.router.navigate(["home"]);
    
        }else{
          this.loginError = false;
        }
      }
    );
  }
}
