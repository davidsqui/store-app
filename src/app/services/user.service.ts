import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { NewUser, User } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.API}/api/users`;

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<User[]>(this.url);
  }

  create(user: NewUser) {
    return this.http.post<User>(this.url, user);
  }
}
