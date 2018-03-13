import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../../../../models/userAccount';
import { UserAccountService } from '../../../../services/user-accounts/user-accounts.service';

import swal from 'sweetalert2'
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  user: UserAccount = new UserAccount(null, "", "", "");
  passwordAux:string;
  insertUser:boolean;
  profiles: string[] = ["admin", "sourcing", "provider", "area"];

  constructor(private userAccount: UserAccountService){

  }

  ngOnInit() {
  }

  createAccount( form : NgForm): void {
    this.userAccount.createUser(this.user).subscribe(
      (response: boolean) =>
      {
        this.insertUser = response;
        console.log(response);
        if(!this.insertUser){
          swal(
            'User Created',
            'User has been created successfully',
            'success'
          )
        }
        form.reset();
      }
    )
  }

}
