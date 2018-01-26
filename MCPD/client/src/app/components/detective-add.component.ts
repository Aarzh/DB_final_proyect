import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Detective } from '../models/detective';
import { DetectiveService } from '../services/detective.service';

@Component({
    selector: 'detective-add',
    templateUrl: '../views/detective-add.html',
    providers: [UserService, DetectiveService]
})

export class DetectiveAddComponent implements OnInit{
    public titulo: string;
    public detective: Detective;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _detectiveService: DetectiveService
    ){
        this.titulo = 'Añadir Detectives';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.detective = new Detective ('', '', '', '', '', '');
    }

    ngOnInit(){
        console.log('detective-add cargado');
    }

    onSubmit(){
        console.log(this.detective);
        this._detectiveService.addDetective(this.token, this.detective).subscribe(
                response => {
                    if(!response.detective){
                        this.alertMessage = 'Error en el servidor';
                    }else{
                        this.alertMessage = 'Se ha creado correctamente';
                        this.detective = response.detective;
                        //this._router.navigate(['/edit-detective/', response.detective._id]);
                    }
                },
                error =>{
                    var errorMessage = <any>error;
                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                        this._router.navigate(['detectives/1']);
                        console.log('el problema es aqui');
                      }
                }
        );
    }
}
