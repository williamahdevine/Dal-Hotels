import { Component, OnInit } from '@angular/core';
import { AvaliableRoomServiceService } from '../models/avaliable-room-service.service';
import { RoomSearchService } from '../models/room-search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
//Student Name: Agbola Iseoluwatobi
//Student ID: B00802526
  rooms = [];
  objectKeys = Object.keys;
  notFound = false;
  checked = true;
  roomcount = [];
  count = 0;
  constructor(private roomSearch: RoomSearchService,private service: AvaliableRoomServiceService ) { }


  ngOnInit() {
    // this calls the search function and stores the result in a variable  
    this.rooms=this.roomSearch.alt_search();
    // if(sessionStorage.getItem("notFound")=="true"){
    //   this.notFound = true;
    // }
    setTimeout(() => {
      if(this.checked){
        this.notFound = true;
      }
  }, 2000);
  }
  // this is used to set the images that will be shown of the rooms
  hasResult(){
    var num = Math.floor(Math.random() * 6) + 1;
    this.roomcount[this.count]="../../assets/images/room/"+""+num+".jpg";
    this.count=this.count +1;
    this.checked = false;
  }
  //this creates and array to run the loop and display the number of stars
  range(num){
    var result = [];
    for(var i=0;i < num;i++){
      result.push("");
    }
    return result;
  }

  viewDetails(i) {
    this.service.viewDetails(i, '5f31RvF6LKJCghBQJnPT');
  }
}
