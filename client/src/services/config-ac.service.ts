import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

const BASE_DOMAIN = 'http://localhost:3000';
const BASE_URL = `${BASE_DOMAIN}/controlardu`;


@Injectable()
export class ConfigAcService {

  constructor(private http: Http) { }
  sendOrder(ledtest:string){

  }

}
