import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

const BASEURL = environment.BASEURL;
const BASEURL_TEST = environment.BASEURL + "/test";

@Injectable()
export class ConfigAcService {

  public order: object;
  private options: object = { withCredentials: true };

  constructor(private http: Http) { }

  private handleError(e) {
    console.error("Order not send it");
    return Observable.throw(e.json().message);
  }

  public sendOrderAC(room: string, state: string, setTemp: string,
    mode: string, fanSpeed: string, swing: string) {
    return this.http.post(`${BASEURL}/controller`, {
      room, state, setTemp, mode, fanSpeed, swing
    }, this.options)
      .map((res) => res.json())
      .catch(this.handleError)
  }

  public sendOrderLed(ledinfo: string) {
    let ledtest = {ledtest: ledinfo}
    return this.http.post(`${BASEURL_TEST}`, ledtest, this.options)
      .map(res => res.json())
      .catch(this.handleError)
  }
}
