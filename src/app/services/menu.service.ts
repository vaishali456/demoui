import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MenuService {

  private menu_state = new BehaviorSubject<boolean>(false);
  current_state = this.menu_state.asObservable();

  constructor() { }

  toggleMenu(state: boolean) {
    this.menu_state.next(state);
  }

}
