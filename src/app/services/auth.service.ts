import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, switchMap } from 'rxjs';
import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.API}/api/auth`;

  user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: String) {
    return this.http
      .post<Auth>(`${this.url}/login`, { email, password })
      .pipe(tap((data) => this.tokenService.save(data.access_token)));
  }

  getProfile() {
    return this.http
      .get<User>(`${this.url}/profile`)
      .pipe(tap((user) => this.user.next(user)));
  }

  logout() {
    this.tokenService.remove();
  }
}
