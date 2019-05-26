import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from '../confirmation/confirmation.component';



@Injectable()
export class DialogService {
  constructor(/*private ngbModal: NgbModal*/) {}

  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   */
  // To replace ngbModal with nglightning modal
  confirm(message?: string) {
   //  const m = this.ngbModal.open(ConfirmationComponent);
    // m.componentInstance.confMessage = message || 'Is it OK?';
    // return m.result;
  }
}
