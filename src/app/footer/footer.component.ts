import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public newletter:string;
  constructor() { }

  ngOnInit() {
    this.newletter="";
  }

  newsLetterADD(){
    console.log(this.newletter);
    if(this.newletter === ""){
      alert("Field Empty");
    }else{
      alert("Success Adding Field");
      this.newletter="";
    }
    
  }

}
