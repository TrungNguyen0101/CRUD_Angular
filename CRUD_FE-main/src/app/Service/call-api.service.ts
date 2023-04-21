import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CallAPIService {
  public authentication(token: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return httpOptions;
  }

  constructor(private http: HttpClient) {}
  public APIPost(API: string, bodyData: any, token: any) {
    return this.http.post(API, bodyData, this.authentication(token));
  }
  public APIUpdate(API: string, bodyData: any, token: any) {
    return this.http.put(API, bodyData, this.authentication(token));
  }
  public APIGet(API: string, token: any) {
    return this.http.get(API, this.authentication(token));
  }
}
