import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductListResponse, ProductResponse } from '../models/product';
import { API } from '../shared/constant';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
  ) { }

  // get products list
  getProductList(query: string): Observable<ProductListResponse> {
    return this.http
      .get<ProductListResponse>(`${API_URL}${API.PRODUCT}${query}`)
      .pipe(
        map((res: ProductListResponse) => {        
          return res;
        })
      );
  }

  // add product
  addProduct(data: Product): Observable<ProductResponse> {
    return this.http
      .post<ProductResponse>(`${API_URL}${API.PRODUCT}`, {
        ...data
      })
      .pipe(
        map((res: ProductResponse) => {
          return res;
        })
      );
  }

  // get product by id
  getProduct(productId: string): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(`${API_URL}${API.PRODUCT}/${productId}`)
      .pipe(
        map((res: ProductResponse) => {
          return res;
        })
      );
  }

  // update product
  updateProduct(productId: string, data: Product): Observable<ProductResponse> {
    return this.http
    .put<ProductResponse>(`${API_URL}${API.PRODUCT}/${productId}`,{
      ...data 
    })
    .pipe(
      map((res: ProductResponse) => {
        return res;
      })
    );
  }

  // delete product
  deleteProduct(productId: string): Observable<ProductResponse> {    
    return this.http
    .delete<ProductResponse>(`${API_URL}${API.PRODUCT}/${productId}`)
    .pipe(
      map((res: ProductResponse) => {
        return res;
      })
    );
  }

}
