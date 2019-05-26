import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserInfoService {

  private userName = new BehaviorSubject<string>('Unknown');
  private name = this.userName.asObservable();

  getUserName(): Observable<string> {
   return this.name;
  }

  constructor() {
    this.userName.next(window['loginName']);
  }

  setUserName(newname: string) {
    this.userName.next(newname);
  }

}
