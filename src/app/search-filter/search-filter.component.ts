import { Component, OnInit } from '@angular/core';

import { RoomSearchService } from '../room-search.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  public menuItem:string;
  constructor(public search : RoomSearchService) { 
    
  }
  public Tag:string;
  public Ratings:string;
  public Locations:string;
  public priceRange:string;
  public roomSize:string;
  public numberOfBeds:string;
  public query = {};

  public Tag_Data:any;
  public Ratings_Data:any;
  public Locations_Data:any;
  public priceRange_Data:any;
  public Beds_Data:any;
  public RoomSize_Data:any;
  objectKeys = Object.keys;
  ngOnInit() {
    this.menuItem = "All";
    this.getData();
    this.checkSession();
  }
  checkSession(){
    let data = sessionStorage.getItem('searchData');
    if(data){
      var sessionData = JSON.parse(data);
      this.Ratings = sessionData["Ratings"];
      this.Locations = sessionData["Locations"];
      this.priceRange = sessionData["price_range"];
      this.roomSize = sessionData["Room Sizes"];
      this.numberOfBeds= sessionData["numberOfBeds"];
      // var tag_list = JSON.parse(sessionData["tags"])
  
      // for(var tag in tag_list){
      //   var id = tag_list[tag];
      //   console.log(id)
      //   var elem = <HTMLInputElement>document.getElementById(id);
      //   // console.log(elem);
      //   // elem.checked = true;
      // }
      console.log(sessionData);
    }
    
  }
  getData(){
    this.Tag = "Tags";
    this.Ratings = "All Ratings"
    this.Locations = "All Locations";
    this.priceRange = "All Price Ranges";
    this.roomSize = "All Room Sizes";
    this.numberOfBeds= "All Bed Sizes";
    
    this.Tag_Data = this.search.getAllTags();
    this.Ratings_Data = this.search.getAllRatings();
    this.Locations_Data = this.search.getAllLocations();
    this.priceRange_Data = this.search.getPriceRange();
    this.Beds_Data = this.search.getAllBeds();
    this.RoomSize_Data = this.search.getAllSizes();
  }
  changeValue(input_type,value){
    if(input_type=="Bed Sizes"){
      this.numberOfBeds = value;
    }else if(input_type=="Room Size"){
      this.roomSize = value
    }else if(input_type=="Ratings"){
      this.Ratings = value;
    }else if(input_type=="location"){
      this.Locations = value;
    }
  }
  
  submit(){
    this.query["Ratings"]=this.Ratings;
    this.query["Locations"]=this.Locations;
    this.query["numberOfBeds"]=this.numberOfBeds;
    this.query["price_range"]=this.priceRange;
    this.query["price_data"]=this.priceRange_Data[this.priceRange];
    this.query["Room Sizes"]=this.roomSize;
    // var selected_tags = [];
    // var all = <HTMLInputElement>document.getElementById("All");
    // if(all.checked){
    //   selected_tags.push("All");
    // }else{
    //   for(var tag in this.Tag_Data){
    //     var id = this.Tag_Data[tag].tag_name;
    //     var elem = <HTMLInputElement>document.getElementById(id);
    //     if(elem.checked){
    //       selected_tags.push(this.Tag_Data[tag].tag_name);
    //     }
        
    //   }
    //   console.log(this.query);
    // }
    // this.query["tags"]=JSON.stringify(selected_tags);
    sessionStorage.setItem("searchData", JSON.stringify(this.query));
    window.location.href = "/search";
  }
}
