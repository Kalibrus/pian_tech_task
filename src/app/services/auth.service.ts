import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AuthService{
    private logged: boolean = false;

    onRegister(imputs: string[]) {
        return fetch(`http://localhost:8000/userLogins/${imputs[2]}`, {
            method: 'GET',
        }).then((res) => {
            return res.json();
        }).then((error) => {
            if (error.error) {
                throw Error("Login already taken");
            }
        }).then(() => {
            fetch('http://localhost:8000/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: imputs[2],
                    password: imputs[3],
                    firstName: imputs[0],
                    lastName: imputs[1]
                })
            }).then((response) => {
                return response.json();
            }).then(() => {
                return true;
            });
        });
    }

    onLogin(login: any, password: any) {
        return fetch(`http://localhost:8000/userLogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then((res) => {
            return res.json();
        }).then((error) => {
            if (error.error) {
                throw Error('Wrong password or login');
            } else {
                this.logged = true;
            }
        });
    }

    onLogOut() {
        this.logged = false;
    }

    getLoggedInfo() {
        return this.logged;
    }
}