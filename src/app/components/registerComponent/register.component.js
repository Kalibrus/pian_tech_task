var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(authService) {
        this.authService = authService;
        this.fields = ['First Name', 'Last Name', 'Login', 'Password'];
        this.imputs = ['', '', '', ''];
        this.error = '';
        this.registred = false;
    }
    RegisterComponent.prototype.ngOnInit = function () { };
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        this.registred = false;
        for (var i = 0; i < this.imputs.length; i += 1) {
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
        this.authService.onRegister(this.imputs).then(function () {
            _this.registred = true;
        }).catch(function (err) {
            _this.error = err;
        });
    };
    RegisterComponent.prototype.onChange = function () {
        this.error = '';
    };
    RegisterComponent = __decorate([
        Component({
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        }),
        __metadata("design:paramtypes", [AuthService])
    ], RegisterComponent);
    return RegisterComponent;
}());
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map