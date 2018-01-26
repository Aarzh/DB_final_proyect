import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Case } from '../models/case';

@Injectable()
export class CaseService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getCases(token, detectiveId = null){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({headers: headers});

        if(detectiveId ==null)
        {
            return this._http.get(this.url+'cases', options)
                    .map(res => res.json());
        }else{
            return this._http.get(this.url+'cases/'+detectiveId, options).
                    map(res => res.json());
        }
    }

    getCase(token, id: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url+'case/'+id, options)
                .map(res => res.json());
    }

    addCase(token, caso: Case){
        let params = JSON.stringify(caso);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url+'case', params, {headers: headers})
                    .map(res => res.json());
    }
}
