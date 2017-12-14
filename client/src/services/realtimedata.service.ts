import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import {environment} from '../environments/environment';

const BASEURL = environment.BASEURL + "/realtime";

@Injectable()
export class RealTimeDataService {

private options:object ={ withCredentials:true };

  constructor(private http: Http) { }

  private handleError(e) {
    console.error("Temperature Data Error!");
    return Observable.throw(e.json().message);
  }

  public getDataT() {
     console.log("The data is coming!!!!!!!!!!!!!!!!")
     return this.http.get(`${BASEURL}`, this.options)
       .map((res) => res.json())
       .catch(this.handleError)
   }

}
