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
import { SearchService } from "../../services/search.service";
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(searchService) {
        this.searchService = searchService;
        this.items = [];
        this.popularOutItems = [];
        this.clickedType = '';
        this.pageNumber = 1;
        this.hasMore = false;
    }
    SearchResultComponent.prototype.ngOnInit = function () {
        this.items = this.searchService.getDataItems();
        this.hasMore = this.searchService.getLastDataHasMore();
    };
    SearchResultComponent.prototype.onLoadMore = function () {
        var _this = this;
        this.pageNumber += 1;
        this.searchService.searchData(this.pageNumber).then(function () {
            _this.items = _this.searchService.getDataItems();
        });
    };
    SearchResultComponent.prototype.onAuthorClick = function (event, author_id, author_name) {
        var _this = this;
        if (!event.keyCode || [32, 13].indexOf(event.keyCode) !== -1) {
            this.searchService.getPopularQuestionsByAuthor(author_id).then(function (data) {
                _this.clickedType = "The most popular questions of " + author_name;
                _this.popularOutItems = data.items;
            });
        }
    };
    SearchResultComponent.prototype.onTitleClick = function (event, question_id) {
        if (!event.keyCode || [32, 13].indexOf(event.keyCode) !== -1) {
            this.searchService.getQuestionAnswersFromServer(question_id);
        }
    };
    SearchResultComponent.prototype.onTagClick = function (event, clickedTag) {
        var _this = this;
        if (!event.keyCode || [32, 13].indexOf(event.keyCode) !== -1) {
            this.searchService.getPopularQuestionsByTag(clickedTag).then(function (data) {
                _this.clickedType = "The most popular questions tagged by " + clickedTag;
                _this.popularOutItems = data.items;
            });
        }
    };
    SearchResultComponent.prototype.onSortByField = function (field) {
        var sortFunc;
        switch (field) {
            case 'author':
                sortFunc = function (a, b) {
                    if (a.owner.display_name > b.owner.display_name) {
                        return 1;
                    }
                    if (a.owner.display_name < b.owner.display_name) {
                        return -1;
                    }
                    return 0;
                };
                break;
            case 'title':
                sortFunc = function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (a.title < b.title) {
                        return -1;
                    }
                    return 0;
                };
                break;
            case 'answer':
                sortFunc = function (a, b) {
                    if (+a.answer_count > +b.answer_count) {
                        return 1;
                    }
                    if (+a.answer_count < +b.answer_count) {
                        return -1;
                    }
                    return 0;
                };
                break;
            default:
                break;
        }
        this.items = this.items.sort(function (a, b) {
            return sortFunc(a, b);
        });
    };
    SearchResultComponent = __decorate([
        Component({
            templateUrl: './searchResult.component.html',
            styleUrls: ['./searchResult.component.scss']
        }),
        __metadata("design:paramtypes", [SearchService])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
export { SearchResultComponent };
//# sourceMappingURL=searchResult.component.js.map