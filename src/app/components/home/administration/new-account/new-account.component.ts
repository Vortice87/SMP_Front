import { Component, OnInit } from '@angular/core';
import { UserAccountDTO } from '../../../../models/userAccountDTO';
import { UserAccountDTOService } from '../../../../services/user-accounts/user-accounts.service';

import swal from 'sweetalert2';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  user: UserAccountDTO;
  passwordAux: string;
  insertUser: boolean;
  usernameExists: boolean;
  profiles: string[] = ['admin', 'sourcing', 'area'];

  constructor(private UserAccountDTOservice: UserAccountDTOService) {

  }

  ngOnInit() {
    this.user = new UserAccountDTO(null, '', '', '', '', '', []);
  }

  userExists(): boolean {
    this.usernameExists = false;
    if (this.user.username !== '') {

      this.UserAccountDTOservice.userExists(this.user.username).subscribe(
        (response: boolean) => {
          this.usernameExists = response;
        }
      );
    }
    return true;
  }

  createAccount(form: NgForm): void {
    this.UserAccountDTOservice.createUser(this.user).subscribe(
      (response: boolean) => {
        this.insertUser = response;
        if (this.insertUser) {
          swal({
            type: 'success',
            title: 'Usuario creado satisfactoriamente',
            showConfirmButton: false,
            timer: 1500
          });
        }
        form.reset();
        form.controls.profile.setValue('');
      }
    );
  }

}
