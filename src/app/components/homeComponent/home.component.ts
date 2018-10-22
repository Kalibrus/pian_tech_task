import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
    constructor(private searchService: SearchService){}

    searchString: string;
    errorMessage: string = '';

    ngOnInit() {
        this.searchString = this.searchService.getSearchString();
    }

    onSearch() {
        this.searchService.searchData(1).then((error: any) => {
            this.errorMessage = error;
        });
    }

    onChange() {
        this.searchService.setTitle(this.searchString);
    }
}