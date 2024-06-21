import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  URL = 'http://localhost:5000/api/product';

  getProducst(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URL);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.URL, product);
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.URL, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(this.URL + '/' + id);
  }
}
