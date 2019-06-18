import { Component, OnInit } from '@angular/core';
import { UserService } from '../models/user.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = 'Profile';
  user: UserService;
  isEditing = false;
  message = '';

  constructor() {
    this.user = {
      firstName: 'Irina',
      lastName: 'Shayk',
      gender: 'Female',
      email: 'irina@gmail.com',
      phone: '9010101010'
    };
  }
  ngOnInit() {}
  getEditing() {
    //this.isEditing = !this.isEditing;
    this.message = '';

    return !this.isEditing;
  }
  saveUser(){
    this.message = 'Successfully Saved';
    this.isEditing = !this.isEditing;
    console.log(this.message);
  }
  setEditing() {
    this.message = '';
    this.isEditing = !this.isEditing;
  }

}
