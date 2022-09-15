import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  image = '';
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileService: FileService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    const token = this.tokenService.get();
    if (token) {
      this.authService.getProfile().subscribe();
    }
  }

  createUser() {
    this.userService
      .create({
        name: 'Katy',
        email: 'katy@gmail.com',
        password: '123',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }
  downloadPDF() {
    this.fileService
      .get(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.upload(file).subscribe((data) => {
        this.image = data.location;
      });
    }
  }
}
