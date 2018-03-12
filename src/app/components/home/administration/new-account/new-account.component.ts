import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../../../../models/userAccount';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  username: string;
  password: string;
  password2: string;  
  profile: string;

  constructor() { }

  ngOnInit() {
  }

  createAccount(): void {

    let user = new UserAccount(null,this.username, this.password, this.profile);

  }

}
