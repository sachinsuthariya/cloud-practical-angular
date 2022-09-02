import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonService } from 'src/app/services/common.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItemCount: number = 0
  cartCountSubscription$: Subscription | undefined;
  getCartListSubscription$: Subscription | undefined;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private cartService: CartService,
    private commonService: CommonService,
    private helperService: HelperService,
  ) { }

  ngOnInit(): void {
    this.getCartItems();
    this.getCartItemCount();
  }

  // get cart item count
  getCartItemCount() {
    this.cartCountSubscription$ = this.cartService
      .getCartItemCountObs()
      .subscribe(
        res => {
          this.cartItemCount = res;
        },
      )
  }

  // to init cart count
    // get cart items
    getCartItems() {
      try {
        this.commonService.showSpinner();
        this.getCartListSubscription$ = this.cartService.getCartItems()
          .pipe(first())
          .subscribe(
            res => {
              this.cartService.setCartItemCountObs(res.data.count || 0);
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

  // logout
  logout(): void {
    this.authenticationService.logout();
  }

  // navigate to home screen
  toHome(): void {
    this.router.navigate(['/product']);
  }

  // navigate to cart
  toCart(): void {
    this.router.navigate(['/cart'])
  }

  ngOnDestroy(): void {
    if(this.cartCountSubscription$) {
      this.cartCountSubscription$.unsubscribe();
    }
    if (this.getCartListSubscription$) {
      this.getCartListSubscription$.unsubscribe();
    }
  }
}
