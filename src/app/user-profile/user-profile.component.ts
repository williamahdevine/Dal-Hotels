import { User } from './../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  title = 'Profile';
  user: User;
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
    console.log(this.message);
  }
  setEditing() {
    this.message = '';
    this.isEditing = !this.isEditing;
  }
}
