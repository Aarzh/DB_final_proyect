import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Detective } from '../models/detective';
import { DetectiveService } from '../services/detective.service';
import { Case } from '../models/case';
import { CaseService } from '../services/case.service';

@Component({
    selector: 'case-add',
    templateUrl: '../views/case-add.html',
    providers: [UserService, DetectiveService, CaseService]
})

export class CaseAddComponent implements OnInit{
    public titulo: string;
    public detective: Detective;
    public caso: Case;
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
        this.titulo = 'Crear nuevo caso';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.caso = new Case ('', '', '', '', '', '');
    }

    ngOnInit(){
        console.log('add caso cargado');
    }

    onSubmit(){
        this._route.params.forEach((params: Params) => {
            let detective_id = params['detective'];
            this.caso.detective = detective_id;

            this._caseService.addCase(this.token, this.caso).subscribe(
                response => {

                    if(!response.caso){
                        this.alertMessage = 'Error en el servidor';
                    }else{
                        this.alertMessage = 'Se ha creado correctamente';
                        this.caso = response.caso;
                        //this._router.navigate(['/cases/']);
                    }
                },
                error =>{
                    var errorMessage = <any>error;
                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                        console.log('el problema es en el addcase');
                      }
                }
            )
        });
    }
}
