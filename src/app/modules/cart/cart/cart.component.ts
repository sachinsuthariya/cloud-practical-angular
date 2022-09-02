import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';
import { CommonService } from 'src/app/services/common.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  counts: number[] = [1,2,3,4,5,6,7,8,9,10];
  cartList: Cart[] = [];
  totalItemsCount: number = 0;
  getCartListSubscription$: Subscription | undefined;
  deleteItemSubscription$: Subscription | undefined;
  updateItemSubscription$: Subscription | undefined;
  constructor(
    private cartService: CartService,
    private commonService: CommonService,
    private helperService: HelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  // get cart items
  getCartItems() {
    try {
      this.commonService.showSpinner();
      this.getCartListSubscription$ = this.cartService.getCartItems()
        .pipe(first())
        .subscribe(
          res => {
            this.cartList = res.data.items;
            this.totalItemsCount = res.data.count; 
          },
          error => {
            this.commonService.showErrorToastr(error);
          }
        )
      this.commonService.hideSpinner();
    }catch(err) {
      this.helperService.printLog('Error in get cart list =>', err);
      this.commonService.hideSpinner();
    }
  }


  // remove item from cart
  removeFromCart(cartId: string) {
    try {
      this.commonService.showSpinner();
      this.deleteItemSubscription$ = this.cartService.deleteProduct(cartId)
        .pipe(first())
        .subscribe(
          res => {
            this.commonService.showSuccessToastr(res.message);
            this.getCartItems()
          },
          error => {
            this.commonService.showErrorToastr(error);
          }
        )
      this.commonService.hideSpinner();
    }catch(err) {
      this.helperService.printLog('Error in removing item from cart =>', err);
      this.commonService.hideSpinner();
    }
  }

  // update product quantity
  updateQuantity(cartId: string, event: any) {
    try {
      const quantity = event.target && event.target.value ? event.target.value : 0; 
      
      this.commonService.showSpinner();
      this.updateItemSubscription$ = this.cartService.updateQuantity(cartId, { quantity })
        .pipe(first())
        .subscribe(
          res => {
            // process after changing quantity
            // this.getCartItems();
          },
          error => {
            this.commonService.showErrorToastr(error);
          }
        )
      this.commonService.hideSpinner();
    }catch(err) {
      this.helperService.printLog('Error in update item quantity from cart =>', err);
      this.commonService.hideSpinner();
    }
  }

  // to product screen
  toProducts(): void {
    this.router.navigate(['/product'])
  }

  ngOnDestroy(): void {
    if (this.getCartListSubscription$) {
      this.getCartListSubscription$.unsubscribe();
    }
  }

}
