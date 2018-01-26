import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { DetectiveListComponent } from './components/detective-list.component';
import { HomeComponent } from './components/home.component';
import { DetectiveAddComponent } from './components/detective-add.component';
import { DetectiveEditComponent } from './components/detective-edit.component';
import { DetectiveDetailComponent } from './components/detective-detail.component';
import { CaseAddComponent } from './components/case-add.component';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    DetectiveListComponent,
    HomeComponent,
    DetectiveAddComponent,
    DetectiveEditComponent,
    DetectiveDetailComponent,
    CaseAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
