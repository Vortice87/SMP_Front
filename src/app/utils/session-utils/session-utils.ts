import { UserAccount } from '../../models/userAccount'

export class SessionUtils { 

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
