import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public auth : AuthService) { }
  isLoggedIn = false;
  ngOnInit() {
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
  logout(){
    this.auth.signOut().then(data =>{
      location.href="/";
    }).catch(err =>{
      console.log(err.message);
    })
  }

}
