import { Component, OnInit } from '@angular/core';
import { UserAccountsService } from '../../../services/user-accounts/user-accounts.service';
import { Credentials } from '../../../models/credentials';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  private users: Credentials[];

  constructor(private userAccount: UserAccountsService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers():void
  {
    this.userAccount.getAllUsers().subscribe(
      (response: Credentials[]) =>
      {
        this.users = response;
      },
      (error)  =>
      {  
        console.log("error:"+ JSON.stringify(error));
      }
    );
  }
}
