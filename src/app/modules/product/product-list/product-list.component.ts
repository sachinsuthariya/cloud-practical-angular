import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { CommonService } from 'src/app/services/common.service';
import { HelperService } from 'src/app/services/helper.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  search: string = ''
  productList: Product[] = [];

  productListSubscription$: Subscription | undefined;
  deleteProductSubscription$: Subscription | undefined;
  addCartSubscription$: Subscription | undefined;
  
  constructor(
    private commonService: CommonService,
    private helperService: HelperService,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.getProductList()
  }

  // get product list
  async getProductList(): Promise<void> {
    try {
      this.productList = [];
      this.commonService.showSpinner();
      const reqData: string = this.search ? `?search=${this.search}` : '';
      this.productListSubscription$ = this.productService.getProductList(reqData)
        .pipe(first())
        .subscribe(
          res => {
            this.productList = res && res.data && res.data.list ? res.data. list : []; 
          },
          error => {
            this.commonService.showErrorToastr(error);
            this.commonService.hideSpinner();
          }
        )
      this.commonService.hideSpinner();
    } catch(err) {
      this.helperService.printLog('Error in get product list:: =>', err);
      this.commonService.hideSpinner();
    }
  }
  
  // search
  onSearch(event: any): void {
    this.search = event.target && event.target.value || '';
    if (this.search) {
      this.getProductList();
    } else {
      this.search = '';
      this.getProductList();
    }
  }

  // on add product
  add(): void {
    this.router.navigate(['/product/add']);
  }

  // on edit
  edit(productId: string | undefined): void {
    this.router.navigate(['/product/edit', productId])
  }

  /**
   * to delete product
   *
   * @return void()
   */
  deleteProduct(productId: string | undefined) {
    try {
      if (!productId) return;
      
      this.commonService.showSpinner();
      this.deleteProductSubscription$ = this.productService.deleteProduct(productId)
        .pipe((first()))
        .subscribe(
          res => {
            this.commonService.showSuccessToastr('Product deleted successfully.');
            this.getProductList()
          },
          error => {
            this.commonService.showErrorToastr(error);
            this.commonService.hideSpinner();
          }
        )
      this.commonService.hideSpinner();
    } catch(err) {
      this.commonService.hideSpinner();
      this.helperService.printLog('Error in delete product: =>', err);
    }
  }

  // to track changes in template loop
  trackByFn(index: number, item: Product): number {
    return index; // or item id
  }

  // add to cart
  addToCart(cartId: string, productId: string): void {
    try {
      this.commonService.showSpinner();
      this.addCartSubscription$ = this.cartService.addToCart({cartId, productId, quantity: 1 })
        .pipe(first())
        .subscribe(
          res => {
            // manage cart count
          },
          error => {
            this.commonService.showErrorToastr(error);
          })
      this.commonService.hideSpinner();
    } catch(err) {
      this.commonService.hideSpinner();
      this.helperService.printLog('Error in add to cart: =>', err);
    }
  }

  ngOnDestroy(): void {
    if (this.productListSubscription$) {
      this.productListSubscription$.unsubscribe();
    }
    if (this.deleteProductSubscription$) {
      this.deleteProductSubscription$.unsubscribe();
    }
    if (this.addCartSubscription$) {
      this.addCartSubscription$.unsubscribe();
    }
  }

}
