import { Component, OnInit } from '@angular/core';

import { RoomSearchService } from '../room-search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  rooms = [];
  objectKeys = Object.keys;
  notFound = true;

  constructor(private roomSearch: RoomSearchService ) { }

  ngOnInit() {
    // this.rooms=this.roomSearch.Search();
    this.rooms=this.roomSearch.alt_search();
    console.log(this.rooms);
  }

  genRandomNum() {
    this.notFound = false;
    return Math.floor(Math.random() * 6) + 1;
  }
  range(num){
    console.log(num);
    var result = [];
    for(var i=0;i < num;i++){
      result.push("");
    }
    return result;
  }
}
