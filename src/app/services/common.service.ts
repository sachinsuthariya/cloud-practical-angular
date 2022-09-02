import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public loading:boolean = false;
  constructor(
    private toastr: ToastrService
  ) { }

  // show spinner
  showSpinner(): void {
    this.loading = true;
  }

  // hide spinner
  hideSpinner(): void {
    this.loading = false;
  }

  // show success toastr
  showSuccessToastr(message: string, title: string = 'Success'): void {
    this.toastr.success(message, title);
  }

  // show error toastr
  showErrorToastr(message: string, title: string = 'Error'): void {
    this.toastr.error(message, title);
  }

}
