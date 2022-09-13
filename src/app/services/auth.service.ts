import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from './../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.API}/api/auth`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: String) {
    return this.http
      .post<Auth>(`${this.url}/login`, { email, password })
      .pipe(tap((data) => this.tokenService.save(data.access_token)));
  }

  profile() {
    return this.http.get<User>(`${this.url}/profile`);
  }
}
