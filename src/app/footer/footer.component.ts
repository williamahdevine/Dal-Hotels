import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public newletter:string;
  public isLoggedIn = false;
  constructor(public auth : AuthService) { }

  ngOnInit() {
    this.newletter="";
    this.userStatus();
  }

  userStatus(){
    var that = this;
    this.auth.checkLoginStatus().onAuthStateChanged(function (user){
      if(user){
        that.isLoggedIn = true;
      }else{
        that.isLoggedIn = false;
      }
    })
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

  logout(){
    alert("test")
    this.auth.signOut().then(data =>{
      console.log(data)
    }).catch(err =>{
      console.log(err.message);
    })
  }

}
