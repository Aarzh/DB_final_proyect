import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Detective } from '../models/detective';
import { DetectiveService } from '../services/detective.service';
import { UploadService } from '../services/upload.service';
import { CaseService } from '../services/case.service';
import { Case } from '../models/case';

@Component({
    selector: 'detective-detail',
    templateUrl: '../views/detective-detail.html',
    providers: [UserService, DetectiveService, CaseService]
})

export class DetectiveDetailComponent implements OnInit{
    public detective: Detective;
    public cases: Case[];
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _detectiveService: DetectiveService,
        private _caseService: CaseService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('detective-edit cargado');
        this.getDetective();
        //llamar a getdetective por su id
    }
    getDetective(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._detectiveService.getDetective(this.token, id).subscribe(
                response => {
                    if(!response.detective)
                    {
                        this._router.navigate(['/']);
                    }else{
                        this.detective = response.detective;
                        this._caseService.getCases(this.token, response.detective._id).subscribe(
                                response => {
                                    if(!response.cases){
                                        this.alertMessage = 'No hay albums';
                                    }else{
                                        this.cases = response.cases;
                                    }
                                },
                                error => {
                                    var errorMessage = <any>error;

                                    if(errorMessage != null){
                                        var body = JSON.parse(error._body);
                                        //this.alertMessage = body.message;
                                        console.log(error);
                                        }
                                    }
                        );
                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        //this.alertMessage = body.message;
                        console.log(error);
                    }
            })
        });
    }

}
