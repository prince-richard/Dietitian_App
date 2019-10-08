import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

//import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

//import { SharedService } from '../shared-service/shared.service';

//component imports
//import { User } from '../../models/user';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {

    // store the URL so we can redirect after logging in
    redirectUrl: string;


    constructor(private http: HttpClient) { }


  login(email: string, password: string):Observable<any> {
        
      let loginUrl = 'api/account/login';

        return this.http
          .post<any>(loginUrl, JSON.stringify({ email: email, password: password }), headers)
            .pipe(
          tap(res => this.setLoggedIn(res)),
            catchError(this.handleError('login', []))
            );
  }

  accountrecovery(email: string): Observable<any> {
    let recoveryurl = 'api/account/accountrecovery/'+email;
    return this.http
      .get<any>(recoveryurl)
      .pipe(
      tap(heroes => console.log(`recoveryurl success`, heroes)),
      catchError(this.handleError('recoveryurl', []))
      );
  }

  passwordreset(email: string, token: string, new_password: string): Observable<any> {
    let reset = 'api/account/passwordreset';
    return this.http
      .post<any>(reset, JSON.stringify({ email: email, token: token, new_password: new_password }), headers)
      .pipe(
        tap(res => {
          return res as any;
        }),
        catchError(this.handleError('login', []))
    );
  }

  verifyemailtoken(email: string, token: string): Observable<any> {
    let verifyemail = 'api/account/verifyemail';
    return this.http
      .post<any>(verifyemail, JSON.stringify({ email: email, token: token}), headers)
      .pipe(
        tap(res => {
          return res as any;
        }),
        catchError(this.handleError('login', []))
      );
  }


  isloggedin(): boolean {
    if (sessionStorage.getItem('token')) {
      return true;
    }
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
  }

  setLoggedIn(user) {
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem("firstname", user.firstname);
      sessionStorage.setItem("lastname", user.lastname);
      sessionStorage.setItem("middlename", user.middlename);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("username", user.username);
      sessionStorage.setItem("phonenumber", user.phonenumber);
      sessionStorage.setItem("gender", user.gender);
    sessionStorage.setItem("id", user.id);
    sessionStorage.setItem("customer", user.customer);
      //sessionStorage.setItem("userlastname", user.LastName);
    }

    //create_user(user: User): Promise<any> {
    //  let Url = 'api/medi/users';
    //  this.SharedService.set_progress(true);
    //  return this.authHttp
    //    .post(Url, user, { headers: this.headers })
    //    .toPromise()
    //    .then(res => {
    //      this.SharedService.set_progress(false);
    //      console.log(res);
    //      return res as any;
    //    })
    //    .catch(this.handleError);
    //}

    //accountrecovery(email: string): Promise<any> {
    //  let apiurl = 'api/medi/users/accountrecovery';
    //  const url = `${apiurl}/${email}`;
    //  return this.http
    //    .get(url, { headers: this.headers })
    //    .toPromise()
    //    .then(res => {
    //      return res as any;
    //    })
    //    .catch(this.handleError);
    //}

    //emailconfirm(email: string, token: string): Promise<any> {
    //  let apiurl = 'api/medi/users/emailconfirm';
    //  return this.http
    //    .post(apiurl, JSON.stringify({ email: email, token: token }), { headers: this.headers })
    //    .toPromise()
    //    .then(res => {
    //      return res as any;
    //    })
    //    .catch(this.handleError);
    //}

    //delete_user(email: string): Promise<string> {
    //  let apiurl = 'api/medi/users/delete';
    //  const url = `${apiurl}/${email}`;
    //  return this.authHttp
    //    .delete(url, { headers: this.headers })
    //    .toPromise()
    //    .then(res => {
    //      return res.toString();
    //    })
    //    .catch(this.handleError);
    //}
    //logout() {
    //    sessionStorage.clear();
    //    localStorage.clear();
    //}

    //changepassword(email: string, old_password: string, new_password: string): Promise<any> {
    //    let loginUrl = 'api/medi/users/changepassword';

    //    return this.authHttp
    //        .post(loginUrl, JSON.stringify({ email: email, current_password: old_password, new_password: new_password }), { headers: this.headers })
    //        .toPromise()
    //        .then(res => res.json() as any)
    //        .catch(this.handleError);
    //}

    //changeprofiledata(superuser: User): Promise<any> {
    //    let Url = 'api/medi/users/changeprofiledata';
    //    return this.authHttp
    //        .post(Url, superuser, { headers: this.headers })
    //        .toPromise()
    //        .then(res => {
    //            this.setLoggedIn(superuser);
    //            return res.json() as any;
    //        })
    //        .catch(this.handleError);
    //}

    //getallsuperusers(): Promise<User[]> {
    //    let Url = 'api/medi/users';
    //    return this.authHttp
    //        .get(Url,{ headers: this.headers })
    //        .toPromise()
    //        .then(res => {
    //            return res.json() as User[];
    //        })
    //        .catch(this.handleError);
    //}

    //isloggedin(): boolean {
    //    if (sessionStorage.getItem('useremail')) {
    //        return true;
    //    }
    //}
    //getloggedin_data(){
    //    var return_user = {
    //        Email: sessionStorage.getItem('useremail'),
    //        PhoneNumber: sessionStorage.getItem("userphonenumber"),
    //        Address: sessionStorage.getItem("useraddress"),
    //        FirstName: sessionStorage.getItem("userfirstname"),
    //        LastName: sessionStorage.getItem("userlastname"),
    //        AspNetUserId: sessionStorage.getItem("userid"),
    //        Password:''
    //    }
    //    return return_user;
    //}

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
      private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(operation,error); // log to console instead

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
  Email: string;
  PhoneNumber: string;
}
