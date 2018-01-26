import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../services/user.service';
import { GLOBAL } from '../services/global';
import { Detective } from '../models/detective';
import { DetectiveService } from '../services/detective.service';

@Component({
    selector: 'detective-list',
    templateUrl: '../views/detective-list.html',
    providers: [UserService, DetectiveService]
})

export class DetectiveListComponent implements OnInit{
    public titulo: string;
    public detectives: Detective[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _detectiveService: DetectiveService
    ){
        this.titulo = 'Detectives';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }

    ngOnInit(){
        console.log('detective-list cargado');

        this.getDetectives();
    }
    getDetectives(){
        this._route.params.forEach((params: Params) =>{
            let page = +params['page'];
            if(!page){
                page = 1;
            }else{
                this.next_page = page+1;
                this.prev_page = page-1;

                if(this.prev_page == 0){
                    this.prev_page = 1;
                }
            }

            this._detectiveService.getDetectives(this.token, page).subscribe(
                response => {
                    if(!response.detectives)
                    {
                        this._router.navigate(['/']);
                    }else{
                        this.detectives = response.detectives;
                    }
                },
                error => {
                    var errorMessage = <any>error;

                    if(errorMessage != null){
                        var body = JSON.parse(error._body);
                        //this.alertMessage = body.message;
                        console.log(error);
                    }
            });
        });
    }

    public confirmado;
    onDeleteConfirm(id){
        this.confirmado = id;
    }

    onCancelDetective(){
        this.confirmado = null;
    }

    onDeleteDetective(id){
        this._detectiveService.deleteDetective(this.token, id).subscribe(
            response => {
                this.getDetectives();
            },
            error => {
            var errorMessage = <any>error;
            if(errorMessage != null){
                var body = JSON.parse(error._body);
                //this.alertMessage = body.message;
                console.log(error);
            }
        });
    }

}
