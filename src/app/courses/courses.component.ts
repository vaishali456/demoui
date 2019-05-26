import {Course} from '../models/course';

import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

import { Observable } from 'rxjs/Observable';
import { DialogService } from '../services/dialog.service';
import { UserInfoService } from '../services/userinfo.service';
import { NGXLogger } from 'ngx-logger';
import { CourseService } from '../services/course.service';


const sldsOpen = 'slds-is-open';
const sldsSelected = 'slds-is-selected';
const sldsError = 'slds-has-error';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [CourseService, DialogService]
})

export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  course: Course;
  hasErrorCourseName = '';
  hasErrorCourseDescription= '';
  submitMessage = '';
  errorMessage = '';
  submitted = false;
  title = '';
  id = '';
  responseStatus: number;
  currentUser: string;
  userNameObservable = this.userInfoService.getUserName();
  successMessage: string;
  showSuccessModal = false;
  successModalTitle = '';
  successModalMessage = '';
  showModal = false;
  showFailureModal = false;
  failureModalTitle = '';
  failureModalMessage = '';
  responseErrorMessage = '';
  courseResponse: string;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private courseService: CourseService,
   private dialogService: DialogService, private userInfoService: UserInfoService,private logger: NGXLogger) {
    this.createForm();
  }


  ngOnInit() {
    this.userInfoService.getUserName()
    .subscribe(name => this.currentUser = name);
    if (this.route.snapshot.paramMap.get('id')) {
      this.title = 'Update course Information';
      const id = this.route.snapshot.paramMap.get('id');
      this.getCourse(id);

    } else {
      this.title = 'Create a New course';
    }

  }
  private createForm(): void {
    this.courseForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  getCourse(id: string) {
    this.courseService.getCourseById(id)
      .subscribe((course: any) => {
       this.courseResponse = JSON.stringify(course);
        this.courseForm.patchValue({
          id: course.id,
          name: course.name,
          description: course.description
     
        });
      });
  }


  private resetForm(): void {

    this.resetSubmittedAndErrors();
    // this.courseForm.reset();
  }


  // function to reset the helper variables
  private resetSubmittedAndErrors(): void {
    this.submitted = false;
    this.submitMessage = '';
    this.errorMessage = '';
    this.hasErrorCourseName = '';
    this.hasErrorCourseDescription = '';

  }

  saveCourseInformation(course: any): void {
    this.onSubmitcourseInformation(course);
  }

  private onSubmitcourseInformation(course: any) {
    if (this.courseForm.get('name').invalid) {
      this.resetSubmittedAndErrors();
      this.errorMessage = 'The name of the course is required.';
      this.hasErrorCourseName = sldsError;
    } else if (this.courseForm.get('description').invalid) {
      this.resetSubmittedAndErrors();
      this.errorMessage = 'The description of the course is required.';
      this.hasErrorCourseDescription = sldsError;
    } else {
     // course.lastModifiedBy = this.currentUser;
      if (this.route.snapshot.paramMap.get('id') || this.id.length) {
        if (this.route.snapshot.paramMap.get('id')) {
          this.updateAndSavecourse(course, this.route.snapshot.paramMap.get('id'));
        }
        if (this.id.length) {

          this.updateAndSavecourse(course, this.id);
        }
        // this.resetForm();
        this.resetSubmittedAndErrors();
      } else {
        this.createAndSavecourse(course);
      }
    }
  }

  private createAndSavecourse(course: any) {
    this.courseService.createAndSaveCourse(course)
      .subscribe(
      // checking for response
      response => {
        this.courseResponse = JSON.stringify(response);
          this.showModal = true;
          this.showSuccessModal = true;
          this.successModalTitle = 'Success';
          this.successModalMessage = 'course Created Successfully';
          this.id = response['id'];
          this.courseForm.patchValue({
            name: response['name'],
            description: response['description'],
            id: response['id']
          });
          this.resetSubmittedAndErrors();
          this.submitted = true;
          this.title = 'Update course Information';

      });
  }

  private updateAndSavecourse(course: any, id: string) {
    this.courseService.updateAndSaveCourse(course, id)
      .subscribe(
      // checking for response
      response => {
        this.courseResponse = JSON.stringify(response);
          this.showModal = true;
          this.successModalTitle = 'Success';
          this.successModalMessage = 'course Information Updated Successfully';
          this.showSuccessModal = true;
          this.id = response['id'];
          this.courseForm.patchValue({
            id: response['id'],
            name: response['name'],
            description: response['description']
          });
        this.resetSubmittedAndErrors();
        this.submitted = true;

      });
  }

  onClickCloseModal(completed: boolean) {
    // if the user wants to attempt to submit the form
    if (completed) {



    } /* otherwise, if the user cancels or closes the modal */ else {
      this.showSuccessModal = false;
      this.showFailureModal = false;
      this.showModal = false;

    }

  }

 /*canDeactivate(): Promise<boolean> | boolean  {
    this.logger.debug('course Form New Value:' + JSON.stringify(this.courseForm.value));
    this.logger.debug('course Form Old Value:' + this.courseResponse);
    
    if ((JSON.stringify(this.courseForm.value) !== this.courseResponse)  && this.courseForm.dirty && !this.showModal) {
   return this.dialogService.confirm('Your changes will be lost if you continue. Do you want to continue to navigate away from this window?');
    }

            return true;
        }*/

}
