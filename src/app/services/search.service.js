var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
var SearchService = /** @class */ (function () {
    function SearchService(router) {
        this.router = router;
        this.searchString = '';
        this.questions = [];
    }
    ;
    SearchService.prototype.searchData = function (pageNumber) {
        var _this = this;
        var searchUrl = "https://api.stackexchange.com/2.2/search/advanced?page=" + pageNumber + "&pagesize=100&order=desc&sort=activity&title=" + this.searchString + "&site=stackoverflow";
        if (pageNumber === 1) {
            this.questions = [];
        }
        return fetch(searchUrl).then(function (response) {
            return response.json();
        }).then(function (questions) {
            if (questions.error_id) {
                return questions.error_name;
            }
            if (_this.questions.length) {
                _this.questions = _this.questions.concat(questions.items);
            }
            else {
                _this.questions = questions.items;
            }
            _this.lastData = questions;
            _this.router.navigate(['/searchResult']);
        });
    };
    SearchService.prototype.getDataItems = function () {
        if (this.questions) {
            return this.questions;
        }
        else {
            return [];
        }
    };
    SearchService.prototype.getLastDataHasMore = function () {
        if (this.lastData) {
            return this.lastData.has_more;
        }
        else {
            return false;
        }
    };
    SearchService.prototype.getPopularQuestionsByAuthor = function (author_id) {
        var searchUrl = "https://api.stackexchange.com/2.2/users/" + author_id + "/questions?page=1&pagesize=100&order=desc&sort=votes&site=stackoverflow";
        return fetch(searchUrl).then(function (response) {
            return response.json();
        }).then(function (questions) {
            return questions;
        });
    };
    SearchService.prototype.getPopularQuestionsByTag = function (tag) {
        var searchUrl = "https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=votes&tagged=" + tag + "&site=stackoverflow&filter=!9Z(-wwYGT";
        return fetch(searchUrl).then(function (response) {
            return response.json();
        }).then(function (questions) {
            return questions;
        });
    };
    SearchService.prototype.getQuestionAnswersFromServer = function (question_id) {
        var _this = this;
        var searchUrl = "https://api.stackexchange.com/2.2/questions/" + question_id + "/answers?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T";
        fetch(searchUrl).then(function (response) {
            return response.json();
        }).then(function (answers) {
            _this.questionAnswers = answers;
            _this.router.navigate(['/questionAnswers']);
        });
    };
    SearchService.prototype.getQuestionAnswers = function () {
        if (this.questionAnswers && this.questionAnswers.items) {
            return this.questionAnswers.items;
        }
        else {
            return [];
        }
    };
    SearchService.prototype.getSearchString = function () {
        return this.searchString;
    };
    SearchService.prototype.setTitle = function (newTitle) {
        this.searchString = newTitle;
    };
    SearchService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [Router])
    ], SearchService);
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=search.service.js.map