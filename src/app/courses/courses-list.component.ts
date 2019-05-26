import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [CourseService]
})
export class CourseListComponent implements OnInit {

  // DefaultQuery indicates the list of fields that can be used for a query. Other fields can be used without defining them here
  // but that will produce warnings when doing a production build.
  defaultQuery = {website: null, name: null};
  courseList: any;
  query = _.clone(this.defaultQuery);
  date: Date;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.date = new Date();
    this.getCourseList();
  }

  getCourseList(): void {
    this.courseService.getCourses()
      .subscribe((res: Response) => {
        if (_.isArray(res)) {
          this.courseList = _.orderBy(res, [course => course.name.toLowerCase()], ['asc']);
        } else {
          this.courseList = [res];
        }
      });
  }

  filterCourseList(): void {
    // this.courseService.getCourse(this.query)
    //   .subscribe((res: Response) => {
    //     if (_.isArray(res)) {
    //       this.courseList = _.orderBy(res, [course => course.name.toLowerCase()], ['asc']);
    //     } else {
    //       this.courseList = [res];
    //     }
    //   });
  }

  resetcourseList(): void {
    this.query = _.clone(this.defaultQuery);
    this.getCourseList();
  }

}