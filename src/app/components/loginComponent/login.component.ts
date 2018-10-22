import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
    constructor(private authService: AuthService) {}

    login: string = '';
    password: string = '';
    error: string = '';
    logged: boolean = false;

    ngOnInit() {
        this.logged = this.authService.getLoggedInfo();
    }

    onLogin() {
        this.authService.onLogin(this.login, this.password).then(() => {
            this.logged = true;
        }).catch((error) => {
            this.error = error;
        });
    }

    onChange() {
        this.error = '';
    }

    onLogOut() {
        this.logged = false;
        this.authService.onLogOut();
    }
}