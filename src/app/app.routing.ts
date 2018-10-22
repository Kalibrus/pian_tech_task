import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/homeComponent/home.component';
import { LoginComponent } from "./components/loginComponent/login.component";
import { RegisterComponent } from "./components/registerComponent/register.component";
import { SearchResultComponent } from "./components/searchResultComponent/searchResult.component";
import { QuestionAnswersComponent } from "./components/questionAnswersComponent/questionAnswers.component";
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'searchResult', component: SearchResultComponent, canActivate: [AuthGuard] },
    { path: 'questionAnswers', component: QuestionAnswersComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);