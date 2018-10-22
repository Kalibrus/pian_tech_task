import { Router } from '@angular/router';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SearchService{
    constructor(
        private router: Router
    ) {};

    private searchString: string = '';
    private questions: any = [];
    private questionAnswers: any;
    private lastData: any;

    searchData(pageNumber: number): any {
        let searchUrl = `https://api.stackexchange.com/2.2/search/advanced?page=${pageNumber}&pagesize=100&order=desc&sort=activity&title=${this.searchString}&site=stackoverflow`;

        if (pageNumber === 1) {
            this.questions = [];
        }

        return fetch(searchUrl).then((response) => {
            return response.json();
        }).then((questions) => {
            if (questions.error_id) {
                return questions.error_name;
            }

            if (this.questions.length) {
                this.questions = [...this.questions, ...questions.items];
            } else {
                this.questions = questions.items;
            }
            this.lastData = questions;

            this.router.navigate(['/searchResult']);
        });
    }

    getDataItems(): any {
        if (this.questions) {
            return this.questions;
        } else {
            return [];
        }
    }

    getLastDataHasMore() {
        if (this.lastData) {
            return this.lastData.has_more;
        } else {
            return false;
        }
    }

    getPopularQuestionsByAuthor(author_id: number) {
        let searchUrl = `https://api.stackexchange.com/2.2/users/${author_id}/questions?page=1&pagesize=100&order=desc&sort=votes&site=stackoverflow`;

        return fetch(searchUrl).then((response) => {
            return response.json();
        }).then((questions) => {
            return questions;
        });
    }

    getPopularQuestionsByTag(tag: string) {
        let searchUrl = `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=votes&tagged=${tag}&site=stackoverflow&filter=!9Z(-wwYGT`;

        return fetch(searchUrl).then((response) => {
            return response.json();
        }).then((questions) => {
            return questions;
        });
    }

    getQuestionAnswersFromServer(question_id: number) {
        let searchUrl = `https://api.stackexchange.com/2.2/questions/${question_id}/answers?page=1&pagesize=100&order=desc&sort=activity&site=stackoverflow&filter=!9Z(-wzu0T`;

        fetch(searchUrl).then((response) => {
            return response.json();
        }).then((answers) => {
            this.questionAnswers = answers;
            this.router.navigate(['/questionAnswers']);
        });
    }

    getQuestionAnswers() {
        if (this.questionAnswers && this.questionAnswers.items) {
            return this.questionAnswers.items;
        } else {
            return [];
        }
    }

    getSearchString() {
        return this.searchString;
    }

    setTitle(newTitle: string) {
        this.searchString = newTitle;
    }
}