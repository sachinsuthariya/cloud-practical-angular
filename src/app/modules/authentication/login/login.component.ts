import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { HelperService } from 'src/app/services/helper.service';
import { first, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loginForm: FormGroup = new FormGroup({});
    loading: boolean = false;
    submitted: boolean = false;
    loginSubscription$: Subscription | undefined;

  constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private helperService: HelperService,
        private commonService: CommonService,
        private authenticationService: AuthenticationService,
  ) {
    // if already loggedin navigate user to product screen
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/product'])
    }
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  // Initialization of form controls
  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f():any { return this.loginForm.controls; }


  // on login
  async onSubmit(): Promise<void> {
    try {
      this.submitted = true;
      if (!this.loginForm.valid) return;
      const {
        email,
        password,
      } = this.loginForm.value;

      this.loading = true;
      this.commonService.showSpinner();
      this.loginSubscription$ = this.authenticationService.login(email, password)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/product']);
          },
          error => {
            this.loading = false;
            this.submitted = false;            
            this.commonService.showErrorToastr(error);
          }
        );
      this.commonService.hideSpinner();
    }catch (err) {
      this.loading = false;
      this.submitted = false;
      this.helperService.printLog('Error in login:: =>', err);
      this.commonService.hideSpinner();
    }
  }

  ngOnDestroy(): void {
    if (this.loginSubscription$) {
      this.loginSubscription$.unsubscribe();
    }
  }

}
