import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

const BASEURL = environment.BASEURL + "/proyector";

@Injectable()
export class ProyectorService {

  public proyector: any;
  private options: object = { withCredentials: true };

  constructor(private http: Http) { }

  private handleError(e) {
    console.error("Proyector Error!");
    return Observable.throw(e.json().message);
  }

  public sendOrderProyector(state: string) {
    console.log("The proyector Rocks!!!!! Order: " + state);
    return this.http.post(`${BASEURL}`, { state }, this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
