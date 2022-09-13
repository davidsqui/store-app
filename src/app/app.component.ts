import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  createUser() {
    this.userService
      .create({
        name: 'David',
        email: 'david@gmail.com',
        password: '123',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
}
