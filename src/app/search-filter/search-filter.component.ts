import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  public menuItem:string;
  constructor() { }

  ngOnInit() {
    this.menuItem = "All";
  }
  changeItem(item:string){
    console.log(item);
    this.menuItem = item;
  }
  
}
