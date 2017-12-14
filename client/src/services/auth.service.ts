import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../environments/environment';

const BASEURL = environment.BASEURL + "/auth";

@Injectable()
export class AuthService {

  private user: object;
  private userLoginEvent: EventEmitter<object> = new EventEmitter<object>();
  private options: object = { withCredentials: true };

  constructor(private http: Http) { this.isLoggedIn().subscribe() }

  public getLoginEventEmitter(): EventEmitter<object> {
    return this.userLoginEvent;
  }

  public getUser() {
    return this.user;
  }

  private emitUserLoginEvent(user) {
    this.user = user;
    this.userLoginEvent.emit(user);
    return user;
  }

  private handleError(e) {
    console.error("Auth Error!");
    return Observable.throw(e.json().message);
  }

  signup(username: string, name: string, email: string, city: string, password: string) {
    return this.http.post(`${BASEURL}/signup`, {
      username, name, email, city, password
    }, this.options)
      .map(res => res.json())
      .map(user => this.emitUserLoginEvent(user))
      .catch(this.handleError);
  }

  login(username: string, password: string) {
    console.log(`Login with user:${username}`);
    return this.http.post(`${BASEURL}/login`, { username, password }, this.options)
      .map(res => res.json())
      .map(user => this.emitUserLoginEvent(user))
      .catch(this.handleError);
  }

  logout() {
    return this.http.get(`${BASEURL}/logout`, this.options)
      .map(res => res.json())
      .map(user => this.emitUserLoginEvent(null))
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASEURL}/loggedin`, this.options)
      .map(res => res.json())
      .map(user => this.emitUserLoginEvent(user))
      .catch(this.handleError);
  }

}
