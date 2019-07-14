import { Component, OnInit } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() {}
  public model ={username:"",password:""};
  public status;
  ngOnInit() {
  }
  onSubmit(){
    console.log(this.model);
    if(this.model.username=="" && this.model.password==""){
      this.status = "Invalid Username and password";
    }else if(this.model.username==""){
      this.status = "Invalid Username";
    }else if(this.model.password==""){
      this.status = "Invalid Password";
    }else{
      location.href="/";
    }
    
  }

}
