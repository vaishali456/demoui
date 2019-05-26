import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Authorization':'Basic YWRtaW4xOnNlY3JldDE='
});


@Injectable()
export class CourseService {
  private base_url = '/courses/';
  API_BASE_URL: string = environment.API_URL;
  AUTHORIZATION: string = environment.AUTHORIZATION;

  constructor(private http: HttpClient) {}

  createCourse(name: string, description: string, lastModifiedBy: string): Observable<any> {

    // body of the request
    const body = {
      name: name,
      description: description
     
    };

    // making a POST request to the API and maping the data response to extractData
    return this.http.post(this.base_url, body);
  }

  getCourseById(course_guid: string): Observable<any> {
    return this.http.get(this.API_BASE_URL+this.base_url.concat(course_guid),{headers:headers});
  }
  
  updateCourse(name: string, description: string, id: string) {

    // body of the request
    const body = {
      name: name,
      description: description
    };
    // making a PUT request to the API and maping the data response to extractData
    this.http.put(this.base_url.concat(id), JSON.stringify(body));
  }

  createAndSaveCourse(course: any): Observable<any> {
    // making a POST request to the API and mapping the data response to extractData
    return this.http.post(this.API_BASE_URL+this.base_url, course, {headers:headers});
  }
updateAndSaveCourse(course: any, id: string): Observable<any> {
    // making a PUT request to the API and maping the data response to extractData
    return this.http.put(this.API_BASE_URL+this.base_url.concat(id), course, {headers:headers});
  }

  getCourses(): Observable<any> {
    return this.http.get(this.API_BASE_URL+this.base_url,{headers:headers});
}

}
