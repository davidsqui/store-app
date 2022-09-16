import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let user = localStorage.getItem('user');
    console.log(user);
    if (user) {
      let user1 = JSON.parse(user);
      console.log(user1);
      if (user1) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    } else {
      return false;
    }

    // return this.authService.user$.pipe(
    //   map((user) => {
    //     console.log(user);
    //     if (user?.role === 'admin') {
    //       return true;
    //     } else {
    //       this.router.navigate(['/home']);
    //       return false;
    //     }
    //   })
    // );
  }
}
