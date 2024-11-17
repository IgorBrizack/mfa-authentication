import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { IUserJwt } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('core_token');

    const userData = this.userService.decodeToken(token as string) as IUserJwt;

    if (!userData) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!userData.mfa_authentication.mfa_approved) {
      this.router.navigate(['/authentication']);
      return false;
    }

    return true;
  }
}
