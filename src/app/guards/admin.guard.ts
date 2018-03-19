import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAccount } from '../models/userAccount';
import { SessionUtilsModule } from '../utils/session-utils/session-utils.module';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var user: UserAccount = SessionUtilsModule.getCurrentLoggedInUser();
    if (user.profile == "admin") {
      return true;
    }

    this.router.navigate(["home"]);
    return false;

  }
}
