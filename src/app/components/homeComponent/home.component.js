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
import { SearchService } from '../../services/search.service';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(searchService) {
        this.searchService = searchService;
        this.errorMessage = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.searchString = this.searchService.getSearchString();
    };
    HomeComponent.prototype.onSearch = function () {
        var _this = this;
        this.searchService.searchData(1).then(function (error) {
            _this.errorMessage = error;
        });
    };
    HomeComponent.prototype.onChange = function () {
        this.searchService.setTitle(this.searchString);
    };
    HomeComponent = __decorate([
        Component({
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        }),
        __metadata("design:paramtypes", [SearchService])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map