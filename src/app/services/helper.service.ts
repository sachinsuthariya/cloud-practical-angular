import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private commonService: CommonService) {}

  // print log
  printLog(msg: string, ...params: any): void {
    if (!environment.production) {
      console.log(msg, ...params);
    }
  }

  // set item to local storage
  setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // get item from local storage
  getLocalStorage(key: string): string {
    return localStorage.getItem(key) || '';
  }
}
