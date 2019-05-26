import { Component } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  date: Date;
  confMessage: string;
  showErrorModal: boolean;
  constructor(/*public activeModal: NgbActiveModal*/) {this.date = new Date(); }


}
