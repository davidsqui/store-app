import { Component } from '@angular/core';
import { FileService } from './services/file.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  image = '';
  constructor(
    private userService: UserService,
    private fileService: FileService
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
