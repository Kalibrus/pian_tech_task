import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";

@Component({
    templateUrl: './questionAnswers.component.html',
    styleUrls: ['./questionAnswers.component.scss']
})

export class QuestionAnswersComponent implements OnInit {
    constructor(private searchService: SearchService){}

    items: any[] = [];

    ngOnInit() {
        this.items = this.searchService.getQuestionAnswers();
    }
}