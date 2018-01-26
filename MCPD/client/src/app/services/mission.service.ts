import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Mission } from '../models/mission';

@Injectable()
export class MissionService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getMissions(token, page){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url+'missions/'+page, options)
                .map(res => res.json());
    }
}
