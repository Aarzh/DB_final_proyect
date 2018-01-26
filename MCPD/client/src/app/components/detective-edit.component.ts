import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Detective } from '../models/detective';
import { DetectiveService } from '../services/detective.service';
import { UploadService } from '../services/upload.service';

@Component({
    selector: 'detective-edit',
    templateUrl: '../views/detective-add.html',
    providers: [UserService, DetectiveService, UploadService]
})

export class DetectiveEditComponent implements OnInit{
    public titulo: string;
    public detective: Detective;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _detectiveService: DetectiveService,
        private _uploadService: UploadService
    ){
        this.titulo = 'Modificar datos de detectives';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.detective = new Detective ('', '', '', '', '', '');
        this.is_edit = true;
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

    onSubmit(){
        console.log(this.detective);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._detectiveService.editDetective(this.token, id, this.detective).subscribe(
                    response => {
                        if(!response.detective){
                            this.alertMessage = 'Error en el servidor';
                        }else{
                            this.alertMessage = 'Se ha modificado correctamente';
                            this._uploadService.makeFileRequest(this.url+"uploadImageDetective/"+id, [], this.filesToUpload, this.token, 'image')
                                .then(
                                    (result) => {
                                        this._router.navigate(['/detectives' , 1]);
                                    },
                                    (error) => {
                                        console.log(error);
                                    }
                                );

                            //this.detective = response.detective;
                            //this._router.navigate(['/editar-detective'], response.detective._id);
                        }
                    },
                    error =>{
                        var errorMessage = <any>error;

                        if(errorMessage != null){
                            var body = JSON.parse(error._body);
                            this.alertMessage = body.message;
                            console.log(error);
                          }
                    }
            );
        });
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput : any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

}
