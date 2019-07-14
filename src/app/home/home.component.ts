import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
