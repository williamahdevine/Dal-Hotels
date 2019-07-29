import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public newletter:string;
  public isLoggedIn = false;
  constructor(public auth : AuthService, public feedback : FeedbackService) { }

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
    
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (this.newletter == '' || !re.test(this.newletter))
    {
        alert('Please enter a valid email address.');
        return false;
    }
    
    if(this.newletter === ""){
      alert("Field Empty");
    }else{
      if(this.isLoggedIn){
        this.feedback.addNewsLetter(this.newletter).then(data =>{
          alert("Email Added to newsletter")
        })
      }else{
        alert("Login to add email to newsletter");
      }
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
