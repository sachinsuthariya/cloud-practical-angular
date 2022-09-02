import { Component } from '@angular/core';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';
import { CommonService } from './services/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'product-management';
  loaderConfig = {
    backdropBorderRadius: '3px',
    animationType: ngxLoadingAnimationTypes.chasingDots,
    primaryColour: '#0d6efd',
    secondaryColour: '#fff',
  }

  constructor(
    public commonService: CommonService,
    private authenticationService: AuthenticationService,
    ) {
  }

  // check whether user is logged in or not
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
