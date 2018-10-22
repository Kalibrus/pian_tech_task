import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";

@Component({
    templateUrl: './searchResult.component.html',
    styleUrls: ['./searchResult.component.scss']
})
export class SearchResultComponent implements OnInit {
    constructor(private searchService: SearchService){}

    items: any = [];
    popularOutItems: any[] = [];
    clickedType: string = '';
    pageNumber: number = 1;
    hasMore: boolean = false;

    ngOnInit() {
        this.items = this.searchService.getDataItems();
        this.hasMore = this.searchService.getLastDataHasMore();
    }

    onLoadMore() {
        this.pageNumber += 1;
        this.searchService.searchData(this.pageNumber).then(() => {
            this.items = this.searchService.getDataItems();
        });
    }

    onAuthorClick(event: any, author_id: number, author_name: string) {
        if (!event.keyCode || [32, 13].indexOf(event.keyCode) !== -1) {
            this.searchService.getPopularQuestionsByAuthor(author_id).then((data) => {
                this.clickedType = `The most popular questions of ${author_name}`;
                this.popularOutItems = data.items;
            });
        }
    }

    onTitleClick(event: any, question_id: number) {
        if (!event.keyCode || [32, 13].indexOf(event.keyCode) !== -1) {
            this.searchService.getQuestionAnswersFromServer(question_id);
        }
    }

    onTagClick(event: any, clickedTag: string) {
        if (!event.keyCode || [32, 13].indexOf(event.keyCode) !== -1) {
            this.searchService.getPopularQuestionsByTag(clickedTag).then((data) => {
                this.clickedType = `The most popular questions tagged by ${clickedTag}`;
                this.popularOutItems = data.items;
            });
        }
    }

    onSortByField(field: string) {
        let sortFunc: any;

        switch (field) {
            case 'author':
                sortFunc = function (a: any, b: any) {
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
                sortFunc = function (a: any, b: any) {
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
                sortFunc = function (a: any, b: any) {
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

        this.items = this.items.sort((a: any, b: any) => {
            return sortFunc(a, b);
        })
    }
}