import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}
  public getSession(value: string) {
    return sessionStorage.getItem(value);
  }
  public setSession(value: string, key: string) {
    sessionStorage.setItem(value, key);
  }
}
