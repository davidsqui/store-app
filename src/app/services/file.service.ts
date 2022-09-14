import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private url = `${environment.API}/api/files`;

  constructor(private http: HttpClient) {}

  get(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  upload(file: Blob) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<File>(`${this.url}/upload`, formData, {
      // headers:{
      //   'Content-type': 'multipart/form-data'
      // }
    });
  }
}
