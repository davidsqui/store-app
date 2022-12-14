import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { TokenService } from './../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = this.tokenService.get();
    if (!token) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;

    // return this.authService.user$.pipe(
    //   map((user) => {
    //     console.log(user);
    //     if (!user) {
    //       this.router.navigate(['/home']);
    //       return false;
    //     }
    //     return true;
    //   })
    // );
  }
}
