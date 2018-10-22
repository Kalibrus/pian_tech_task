import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './components/appComponent/app.component';
import { HomeComponent } from './components/homeComponent/home.component';
import { NavComponent } from "./components/navComponent/nav.component";
import { RegisterComponent } from "./components/registerComponent/register.component";
import { LoginComponent } from "./components/loginComponent/login.component";
import { SearchResultComponent } from "./components/searchResultComponent/searchResult.component";
import { QuestionAnswersComponent } from "./components/questionAnswersComponent/questionAnswers.component";

import { SearchService } from "./services/search.service";
import { AuthService } from "./services/auth.service";

import { AuthGuard } from "./guards/auth.guard";

import { routing } from './app.routing';

@NgModule({
    imports: [ BrowserModule, FormsModule, routing ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        RegisterComponent,
        LoginComponent,
        SearchResultComponent,
        QuestionAnswersComponent
    ],
    bootstrap: [ AppComponent ],
    providers: [ SearchService, AuthService, AuthGuard ]
})
export class AppModule { }