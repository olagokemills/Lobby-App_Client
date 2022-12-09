import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { AuthModel } from '../models/auth.model';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorModel } from '../models/error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrl = 'https://lobby-production.up.railway.app/api/';

  postData(data, url: string) {
    return this.http
      .post(`${this.apiUrl + url}`, data)
      .pipe(catchError(this.handleError));
  }

  fetchPosts(data, url:string)
  {
    return this.http
        .get(`${this.apiUrl + url}?size=${data.size}&page=${data.page}`)
  }
  fetchSinglePost(data, url:string)
  {
    return this.http 
        .get(`${this.apiUrl + url}/${data}`)
  }

  handleError(error: HttpErrorResponse): Observable<ErrorModel> {
    let dataError = new ErrorModel();
    dataError.errorNumber = error.status;
    dataError.friendlyMessage = 'An error occurred, please try again';
    dataError.message = error.statusText;
    return throwError(dataError);
  }
}
