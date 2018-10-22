import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
    constructor(private authService: AuthService) {}

    fields: string[] = ['First Name', 'Last Name', 'Login', 'Password'];
    imputs: any[] = ['', '', '', ''];
    error: string = '';
    registred: boolean = false;

    ngOnInit() {}

    onSubmit() {
        this.registred = false;

        for (let i = 0; i < this.imputs.length; i += 1) {
            this.imputs[i] = this.imputs[i].trim();
            if (this.imputs[i].indexOf(' ') !== -1) {
                this.error = 'No spaces in the fields';
                return false;
            }
            if (this.imputs[i] === '') {
                this.error = 'Empty fields left';
                return false;
            }
            if (this.imputs[i].match(/[а-яА-Я]/g)) {
                this.error = 'No Russian letters';
                return false;
            }
            if (this.imputs[i].replace(/[a-zA-z1234567890_]/g, '').length !== 0) {
                this.error = 'No strange symbols';
                return false;
            }
        }

        this.authService.onRegister(this.imputs).then(() => {
            this.registred = true;
        }).catch((err) => {
            this.error = err;
        });
    }

    onChange() {
        this.error = '';
    }
}