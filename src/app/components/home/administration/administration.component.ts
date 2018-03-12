import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../../../services/user-accounts/user-accounts.service';
import { UserAccount } from '../../../models/userAccount';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  private users: UserAccount[];

  constructor(private userAccount: UserAccountsService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers():void
  {
    this.userAccount.getAllUsers().subscribe(
      (response: UserAccount[]) =>
      {
        this.users = response;
        console.log(this.users);
      },
      (error)  =>
      {  
        console.log("error:"+ JSON.stringify(error));
      }
    );
  }
}
