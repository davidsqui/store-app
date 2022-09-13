import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from './../../environments/environment';
import { NewProduct, Product, UpdateProduct } from './../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${environment.API}/api/products`;

  constructor(private http: HttpClient) {}

  getProducts(limit: number, offset: number) {
    const params = { limit, offset };
    return this.http
      .get<Product[]>(this.url, { params, context: checkTime() })
      .pipe(
        map((products) =>
          products.map((product) => {
            return {
              ...product,
              taxes: 0.18 * product.price,
            };
          })
        )
      );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.url}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(() => new Error('Ups algo falló en el servidor'));
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        }
        return throwError(() => new Error('Ups algo salió mal'));
      })
    );
  }

  createProduct(product: NewProduct) {
    return this.http.post<Product>(this.url, product);
  }

  updateProduct(id: string, product: UpdateProduct) {
    return this.http.put<Product>(`${this.url}/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
