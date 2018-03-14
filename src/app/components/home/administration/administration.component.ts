import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../../../services/user-accounts/user-accounts.service';
import { UserAccount } from '../../../models/userAccount';
import swal from 'sweetalert2';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  private users: UserAccount[];

  constructor(private userAccount: UserAccountService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers():void
  {
    this.userAccount.getAllUsers().subscribe(
      (response: UserAccount[]) =>
      {
        this.users = response;
      },
      (error)  =>
      {  
        console.log("error:"+ error);
      }
    );
  }
  deleteUser(user:UserAccount):boolean
  {
     this.userAccount.deleteUser(user.id).subscribe(
       (response: boolean) =>
       {
          if(!response){
            swal({
              type: 'success',
              title: 'User has been eliminated successfully',
              showConfirmButton: false,
              timer: 1500
            })
            this.getAllUsers();
          }
       }
     )
     return true;
  }
}
