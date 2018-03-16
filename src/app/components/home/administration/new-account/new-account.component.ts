import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../../../../models/userAccount';
import { UserAccountService } from '../../../../services/user-accounts/user-accounts.service';

import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { resetFakeAsyncZone } from '@angular/core/testing';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  user: UserAccount = new UserAccount(null, "", "", "");
  passwordAux:string;
  insertUser:boolean;
  usernameExists: boolean;
  profiles: string[] = ["admin", "sourcing", "provider", "area"];

  constructor(private userAccount: UserAccountService){

  }

  ngOnInit() {
  }

  userExists():boolean
  {
    this.usernameExists = false;
    if(this.user.username != ""){
    
    this.userAccount.userExists(this.user.username).subscribe(
      (response: boolean) =>
      {
        this.usernameExists = response;
      }
    )}
    return true;
  }

  createAccount( form : NgForm): void {
    this.userAccount.createUser(this.user).subscribe(
      (response: boolean) =>
      {
        this.insertUser = response;
        console.log(response);
        if(!this.insertUser){
          swal({
            type: 'success',
            title: 'User has been created successfully',
            showConfirmButton: false,
            timer: 1500
          })
        }
        form.reset();
        form.controls.profile.setValue("");
      }
    )
  }

}
