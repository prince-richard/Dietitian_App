import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

//import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class Token {
  access_token: string;
  expires_in: number;
}

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const tokenUrl = 'api/token';  // URL to web api

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string): Observable<any[] | Token> {
    console.log("token api");
    return this.http
      .post<Token>(tokenUrl, 'username=' + username + '&password=' + password, headers)
      .pipe(
      tap(response => {
        console.log(response);
        sessionStorage.setItem('token', response.access_token)
      }),
      catchError(this.handleError('token', []))
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
