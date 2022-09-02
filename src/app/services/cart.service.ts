import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart, CartListResponse, CartResponse } from '../models/cart';
import { API } from '../shared/constant';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemCount$ = new Subject<number>();

  constructor(
    private http: HttpClient,
  ) {
    // this.getCartItems()
  }


    // get cart item count
    getCartItemCountObs(): Observable<number> {
      return this.cartItemCount$.asObservable();
    }

    // set cart item count
    setCartItemCountObs(count: number): void {
      this.cartItemCount$.next(count);
    }

    // add product
    addToCart(data: { cartId: string, productId: string, quantity: number }): Observable<CartResponse> {
      return this.http
        .post<CartResponse>(`${API_URL}${API.CART}`, {
          ...data
        })
        .pipe(
          map((res: CartResponse) => {
            const count = res.data && res.data.count ? res.data.count : 0;
            this.setCartItemCountObs(count);
            return res;
          })
        );
    }

    // update quantity
    updateQuantity(cartId: string, data: { quantity: number }): Observable<CartResponse> {
      return this.http
        .put<CartResponse>(`${API_URL}${API.CART}/${cartId}`, {
          ...data
        })
        .pipe(
          map((res: CartResponse) => {
            const count = res.data && res.data.count ? res.data.count : 0;
            this.setCartItemCountObs(count);
            return res;
          })
        )
    }

    // remove from cart
    deleteProduct(cartId: string): Observable<CartResponse> {    
      return this.http
      .delete<CartResponse>(`${API_URL}${API.CART}/${cartId}`)
      .pipe(
        map((res: CartResponse) => {
          const count = res.data && res.data.count ? res.data.count : 0;
          this.setCartItemCountObs(count);
          return res;
        })
      );
    }

  // get products list
  getCartItems(): Observable<CartListResponse> {
    return this.http
      .get<CartListResponse>(`${API_URL}${API.CART}`)
      .pipe(
        map((res: CartListResponse) => {        
          const count = res.data && res.data.count ? res.data.count : 0;
          this.setCartItemCountObs(count);
          return res;
        })
      );
  }

  // get cart items count
  // getCartItemsCount() {
  //   try {
  //     this.commonService.showSpinner();
  //     this.cartService.getCartItems()
  //       .pipe(first())
  //       .subscribe(
  //         res => {
  //           this.cartList = res.data.items;
  //           this.totalItemsCount = res.data.count; 
  //         },
  //         error => {
  //           this.commonService.showErrorToastr(error);
  //         }
  //       )
  //     this.commonService.hideSpinner();
  //   }catch(err) {
  //     this.helperService.printLog('Error in get cart list =>', err);
  //     this.commonService.hideSpinner();
  //   }
  // }
}
