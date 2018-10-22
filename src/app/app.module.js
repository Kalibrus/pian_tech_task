var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [BrowserModule, FormsModule, routing],
            declarations: [
                AppComponent,
                HomeComponent,
                NavComponent,
                RegisterComponent,
                LoginComponent,
                SearchResultComponent,
                QuestionAnswersComponent
            ],
            bootstrap: [AppComponent],
            providers: [SearchService, AuthService, AuthGuard]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map