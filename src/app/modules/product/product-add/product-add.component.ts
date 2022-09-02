import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { Product, ProductResponse } from 'src/app/models/product';
import { CommonService } from 'src/app/services/common.service';
import { HelperService } from 'src/app/services/helper.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, OnDestroy {

  productForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading: boolean = false;
  title: string = 'Add Product';
  productId: string = '';
  productSubscription$: Subscription | undefined;
  getProductSubscroption$: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService,
    private commonService: CommonService,
    private productService: ProductService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
   }

  ngOnInit(): void {
    this.initProductForm();
    
    if (this.productId) {
      this.getProductDetails();
    }
  }

  // init product forn
  initProductForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      SKU: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f(): any { return this.productForm.controls; }


  // add/edit product
  onSubmit(): void {
    try {
      this.submitted = true;
      if (this.productForm.invalid) return;

      const data = {
        ...this.productForm.value,
      };
      let apiCall = null;
      if (this.productId) {
        apiCall = this.productService.updateProduct(this.productId, data);
      } else {
       apiCall = this.productService.addProduct(data);
      }

      this.loading = true;
      this.commonService.showSpinner();

      this.productSubscription$ = apiCall
        .pipe(first())
        .subscribe(
          res => {
            this.commonService.showSuccessToastr(res.message);
            this.router.navigate(['/']);
          },
          error => {
            this.loading = false;
            this.submitted = false;
            this.commonService.showErrorToastr(error);
          }
      );
      this.submitted = false;
      this.loading = false;
      this.commonService.hideSpinner();
    }catch(err) {
      this.submitted = false;
      this.loading = false;
      this.helperService.printLog('Error in add/edit product::=>', err);
      this.commonService.hideSpinner();
    }
  }

  // get product details
  getProductDetails(): void {
    try {
      this.commonService.showSpinner();

      this.getProductSubscroption$ = this.productService.getProduct(this.productId)
        .pipe(first())
        .subscribe(
          res => this.setProductForm(res.data),
          error => {
            this.commonService.showErrorToastr(error);
          }
        )
      this.commonService.hideSpinner();
    }catch (err) {
      this.helperService.printLog('Error in get product data : =>', err);
      this.commonService.hideSpinner();
    }
  }
  
  // set form data
  setProductForm(formData: Product | undefined): void {
    return this.productForm.setValue({
      name: formData?.name || '',
      SKU: formData?.SKU || '',
      price: formData?.price || '',
    });
  }

  // navigate to home screen
  back(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.productSubscription$) {
      this.productSubscription$.unsubscribe();
    }
    if (this.getProductSubscroption$) {
      this.getProductSubscroption$.unsubscribe();
    }
  }

}
