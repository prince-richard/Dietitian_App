import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class EditprofileService {
  constructor(private http: HttpClient) { }

  changeprofiledata(userdata: User): Observable<any> {
    console.log(userdata);
    let url = 'api/account/changeprofiledata';

    return this.http
      .post<any>(url, userdata, headers)
      .pipe(
        tap(res => {
          this.setLoggedIn(userdata);
        }),
        catchError(this.handleError('login', []))
      );
  }

  setLoggedIn(user: User) {
    sessionStorage.setItem("firstname", user.FirstName);
    sessionStorage.setItem("lastname", user.LastName);
    sessionStorage.setItem("middlename", user.MidName);
    sessionStorage.setItem("phonenumber", user.PhoneNumber);
    sessionStorage.setItem("gender", user.Gender);
  }

  changepassword(email: string, old_password: string, new_password: string): Observable<any> {
    let url = 'api/account/changepassword';

    return this.http
      .post<any>(url, JSON.stringify({ email: email, current_password: old_password, new_password: new_password }), headers)
      .pipe(
        tap(heroes => console.log(`password update`)),
        catchError(this.handleError('login', [])));
  }

  getloggedin_data() {
    var return_user = {
      Id: sessionStorage.getItem('id'), 
      FirstName: sessionStorage.getItem('firstname'),
      LastName: sessionStorage.getItem("lastname"),
      MidName: sessionStorage.getItem("middlename"),
      PhoneNumber: sessionStorage.getItem("phonenumber"),
      Gender: sessionStorage.getItem("gender"),
      Email: sessionStorage.getItem("email")
    }
    return return_user;
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      throw error;
    };
  }


}

//models
export class User {
  Id: string;
  FirstName: string;
  LastName: string;
  MidName: string;
  Email: string;
  PhoneNumber: string;
  Gender: string;
}
