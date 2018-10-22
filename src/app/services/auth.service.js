var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "@angular/core";
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.logged = false;
    }
    AuthService.prototype.onRegister = function (imputs) {
        return fetch("http://localhost:8000/userLogins/" + imputs[2], {
            method: 'GET',
        }).then(function (res) {
            return res.json();
        }).then(function (error) {
            if (error.error) {
                throw Error("Login already taken");
            }
        }).then(function () {
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
            }).then(function (response) {
                return response.json();
            }).then(function () {
                return true;
            });
        });
    };
    AuthService.prototype.onLogin = function (login, password) {
        var _this = this;
        return fetch("http://localhost:8000/userLogin", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then(function (res) {
            return res.json();
        }).then(function (error) {
            if (error.error) {
                throw Error('Wrong password or login');
            }
            else {
                _this.logged = true;
            }
        });
    };
    AuthService.prototype.onLogOut = function () {
        this.logged = false;
    };
    AuthService.prototype.getLoggedInfo = function () {
        return this.logged;
    };
    AuthService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=auth.service.js.map