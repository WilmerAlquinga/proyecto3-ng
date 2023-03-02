import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const apiUrl = environment.apiBaseUrl;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${apiUrl}/${product.product_id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${apiUrl}/${productId}`;
    return this.http.delete<void>(url);
  }
}
