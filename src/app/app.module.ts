import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import * as _ from 'lodash';
import { NglModule } from 'ng-lightning/ng-lightning';
import { LayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';


import { MenuService } from './services/menu.service';

import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { NGXLogger } from 'ngx-logger';

import { ErrorHandlingInterceptor } from './services/errorhandlinginterceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { UserInfoService } from './services/userinfo.service';
import { CourseComponent } from './courses/courses.component';
import { CourseListComponent } from './courses/courses-list.component';
import { Course } from './models/course';
import { CourseService } from './services/course.service';


const ROUTES = [
  {
    path: 'demoCourseform',
    component: CourseListComponent,
  },
  {
    path: '',
    redirectTo: '/demoCourseform',
    pathMatch: 'full',
    // canActivate: [Authguard]
  },
  // {
  //   path: 'voipCustomerform',
  //   component: CustomerListComponent
  // },
  {
    path: 'demoCourseform/new',
    component: CourseComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'demoCourseform/:id/edit',
    component: CourseComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  
];
@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    CourseListComponent,
    // ContactCardComponent,
    // CustomerListComponent,
    // CustomerComponent,
  
    ConfirmationComponent
],
  imports: [
    BrowserModule,
   RouterModule.forRoot(ROUTES),
    NglModule.forRoot(),
    LoggerModule.forRoot({serverLoggingUrl: '', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.OFF}),
    // NglModule.forRoot({ svgPath: 'assets/icons' }),
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    // NgbModule.forRoot()
  ],
  providers: [
    MenuService,
    UserInfoService,
    NGXLogger,
    CourseService,
    // TataContactService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandlingInterceptor,
    //   multi: true
    // },
    CanDeactivateGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationComponent],
})
export class AppModule { }
