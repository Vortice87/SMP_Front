import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserAccountDTO } from '../models/userAccountDTO';
import { SessionUtils } from '../utils/session-utils/session-utils';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var user: UserAccountDTO = SessionUtils.getCurrentLoggedInUser();
    if (user.profile == "admin") {
      return true;
    }

    this.router.navigate(["home"]);
    return false;

  }
}
