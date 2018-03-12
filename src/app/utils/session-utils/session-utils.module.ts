import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccount } from '../../models/userAccount'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

export class SessionUtilsModule { 

  //Gets current logged user
  public static getCurrentLoggedInUser(): UserAccount
  {
    return UserAccount.createUserFromJson(JSON.parse(localStorage.getItem("loggedInUser")));
  }

  //Checks if user is logged in
  public static checkIfLogin() : boolean 
  {
    if(localStorage.getItem("loggedInUser") != null)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  //Removes current logged in user
  public static clearCurrentLoggedInUser(): void
  {
    localStorage.removeItem("loggedInUser");
  }
}
