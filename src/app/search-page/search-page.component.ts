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
  roomcount = [];
  count = 0;
  constructor(private roomSearch: RoomSearchService ) { }


  ngOnInit() {
    // this.rooms=this.roomSearch.Search();
    this.rooms=this.roomSearch.alt_search();
  }
  hasResult(){
    var num = Math.floor(Math.random() * 6) + 1;
    this.roomcount[this.count]="../../assets/images/room/"+""+num+".jpg";
    this.count=this.count +1;
    this.notFound = false;
  }
  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
  range(num){
    var result = [];
    for(var i=0;i < num;i++){
      result.push("");
    }
    return result;
  }
}
