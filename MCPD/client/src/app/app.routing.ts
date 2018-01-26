import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './components/user-edit.component';
import { DetectiveListComponent } from './components/detective-list.component';
import { HomeComponent } from './components/home.component';
import { DetectiveAddComponent } from './components/detective-add.component';
import { DetectiveEditComponent } from './components/detective-edit.component';
import { DetectiveDetailComponent } from './components/detective-detail.component';
import { CaseAddComponent } from './components/case-add.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'detectives/:page', component: DetectiveListComponent},
    {path: 'crear-detective', component: DetectiveAddComponent},
    {path: 'crear-cases/:detective', component: CaseAddComponent},
    {path: 'edit-detective/:id', component: DetectiveEditComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: 'detective/:id', component: DetectiveDetailComponent},
    {path: '**', component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
