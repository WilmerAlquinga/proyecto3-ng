import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.product_id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.delete<void>(url);
  }
}
