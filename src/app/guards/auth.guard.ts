import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ComunicationService } from '../services/shared/comunication.service';
import { UserAccountDTO } from '../models/userAccountDTO';

@Injectable()
export class AuthGuard implements CanActivate {

  private user: UserAccountDTO;

  constructor(private router: Router,
              private comunicationService: ComunicationService) {
                this.comunicationService.getUser().subscribe( res => {
                  this.user = res;
                });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (localStorage.getItem('loggedInUser') != null) {
    //   return true;
    // }
    if (this.user !== null ) {
      return true;
    }
    
    this.router.navigate(['login']);
    return false;

  }
}
