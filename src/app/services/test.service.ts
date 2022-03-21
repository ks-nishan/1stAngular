import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class TestService {
  private BaseAPIurl = 'http://localhost:1337/api/v1/employee/';

  constructor(private http: HttpClient) {}

  // error checking handler for api response and trigger errors
  private handleError(error: HttpErrorResponse | any) {
    console.error('TestService::handleError', error);
    //return Observable.throw(error);
  }

  // Get All employees
  getAll() {
    let APIurl = this.BaseAPIurl + 'get-all-employee';
    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      })
       //catchError(this.handleError)
    );
  }
  

  // Create employee
  addEmployee(newEmployee: any) {
    let APIurl = this.BaseAPIurl + 'create-employee';
    return this.http.post<any>(APIurl, JSON.stringify(newEmployee)).pipe(
      map((response) => {
        return response;
      })
      // catchError(this.handleError)
    );
  }

  // Edit employee
  editEmployee(Employee: any) {
    let APIurl = this.BaseAPIurl + 'update-employee';
    return this.http.post<any>(APIurl, JSON.stringify(Employee)).pipe(
      map((response) => {
        return response;
      })
      //catchError(this.handleError)
    );
  }

  //delete Employee
  deleteEmployee(EmployeeId: number) {
    let APIurl = this.BaseAPIurl + 'delete-all-employee';
    return this.http.post<any>(APIurl, JSON.stringify(EmployeeId)).pipe(
      map((response) => {
        return response;
      })
      //catchError(this.handleError)
    );
  }
}
