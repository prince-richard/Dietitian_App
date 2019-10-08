import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap, map } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class UsermanagerService {

  changepassword = new changepassword();
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {

    let overviewurl = 'api/user/allusers';

    return this.http
      .get<any>(overviewurl)
      .pipe(
        tap(heroes => console.log(`alluser success`, heroes)),
        catchError(this.handleError('user', []))
      );
  }

  getUser(id: number): Observable<any> {

    let getuser = 'api/user/getuser?id=' + id;

    return this.http
      .get<any>(getuser)
      .pipe(
        tap(heroes => console.log(`user success`, heroes)),
        catchError(this.handleError('user', []))
      );
  }

  UserProfileSubmit(user: UserProfile): Observable<any> {
    let url = 'api/user/edituser';
    return this.http
      .post<any>(url, user, headers)
      .pipe(
        tap(res => {
          console.log(res.message);
        }),
        catchError(this.handleError('beacon', []))
      );
  }

  userPasswordSubmit(newpass: string, email: string): Observable<any> {
    this.changepassword.email = email;
    this.changepassword.newpass = newpass;
    let url = 'api/user/changepassword';
    return this.http
      .post<any>(url, this.changepassword, headers)
      .pipe(
        tap(res => {
          console.log(res.message);
        }),
        catchError(this.handleError('beacon', []))
      );
  }

  getUserRole(email: string): Observable<any> {
    let getuserroles = "api/user/userroles?email=" + email;
    if (email != null) {
      return this.http
        .get<any>(getuserroles)
        .pipe(
          tap(res => console.log(`getuserroles success`, res)),
          catchError(this.handleError('overview', []))
        );
    }
    else {
      console.log('Expired Token');
    }
  }

  getRoles(): Observable<any> {
    let getallroles = "api/user/roles";

    return this.http
      .get<any>(getallroles)
      .pipe(
        tap(heroes => console.log(`roles success`, heroes)),
        catchError(this.handleError('overview', []))
      );
  }

  addUserRole(email: string, role: string) {
    let addrole = "api/user/addrole";
    return this.http
      .post<any>(addrole, JSON.stringify({ email: email, role: role }), headers)
      .pipe(
        tap(res => console.log(`addrole success`, res)),
        catchError(this.handleError())
      );
  }

  removeUserRole(email: string, role: string) {
    let removerole = "api/user/removerole";
    return this.http
      .post<any>(removerole, JSON.stringify({ email: email, role: role }), headers)
      .pipe(
        tap(res => console.log(`remove role success`, res)),
        catchError(this.handleError())
      );
  }

  create_user(user: NewUser): Observable<any> {
    console.log(user.rolestring);
    let newuser = "api/user/createnewuser";
    return this.http
      .post<any>(newuser, user, headers)
      .pipe(
        tap(res => console.log(`newuser success`, res)),
        catchError(this.handleError())
      );
  }

  lockupdate(userid: number, operation: boolean): Observable<any> {

    let getuser = 'api/user/lockupdate?userid=' + userid + '&operation='+operation;

    return this.http
      .get<any>(getuser)
      .pipe(
      tap(heroes => console.log(`lockupdate success`, heroes)),
        catchError(this.handleError('user', []))
      );
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
export class UserProfile {
  Id: number;
  FirstName: string;
  LastName: string;
  MidName: string;
  Email: string;
  PhoneNumber: string;
  Gender: string;
  CustomerId: number;
}

export class NewUser {
  FirstName: string;
  LastName: string;
  MidName: string;
  Email: string;
  PhoneNumber: string;
  Gender: string;
  CustomerId: number;
  Password: string;
  rolestring: string[] = new Array<string>();
}

export class changepassword {
  email: string;
  newpass: string;
}

export class Roles {
  Name: string;
  Id: number;
  Checked: boolean;
}
