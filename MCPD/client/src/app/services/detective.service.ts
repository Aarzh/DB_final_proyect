import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Detective } from '../models/detective';

@Injectable()
export class DetectiveService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    getDetectives(token, page){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url+'detectives/'+page, options)
                .map(res => res.json());
    }

    getDetective(token, id: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({headers: headers});
        return this._http.get(this.url+'detective/'+id, options)
                .map(res => res.json());
    }

    addDetective(token, detective: Detective){
        let params = JSON.stringify(detective);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url+'detective', params, {headers: headers})
                    .map(res => res.json());
    }

    editDetective(token, id:string, detective: Detective){
        let params = JSON.stringify(detective);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url+'detective/'+id, params, {headers: headers})
                    .map(res => res.json());
    }

    deleteDetective(token, id: string){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({headers: headers});
        return this._http.delete(this.url+'detective/'+id, options)
                .map(res => res.json());
    }

}
