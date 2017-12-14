import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';

const BASEURL = environment.BASEURL;
const BASEURL_TEST = environment.BASEURL + "/test";
const URL_TEST = 'http://localhost:3000/test';

@Injectable()
export class ConfigAcService {

  public order: object;
  private options: object = { withCredentials: true };

  private TESTURL = 'http://localhost:3000/test';

  constructor(private http: Http) { }

  private handleError(e) {
    console.error("Order not send it");
    return Observable.throw(e.json().message);
  }

 
  public sendOrderAC(room: number, state: string, setTemp: number,
    mode: number, fanSpeed: number, swing: number) {
    console.log("Bring it on baby!!!!")
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


  //make function to get status from the last entry of the DB to see
  //who is the last config of the model
}
