import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}`;


@Injectable()
export class RealTimeDataService {

private options:object ={ withCredentials:true };

  constructor(private http: Http) { }

  private handleError(e) {
    console.error("Temperature Data Error!");
    return Observable.throw(e.json().message);
  }

  public getDataT(realtime) {
     console.log("The data is coming!!!!!!!!!!!!!!!!")
     return this.http.get(`${BASE_URL}/${realtime}`, this.options)
       .map((res) => res.json())
       .catch(this.handleError)
   }

}
