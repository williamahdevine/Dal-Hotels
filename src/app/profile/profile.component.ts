import { Component, OnInit } from '@angular/core';
import { UserService } from '../models/user.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AuthService } from '../auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = 'Profile';
  user = [];
  isEditing = false;
  message = '';

  constructor(public auth: AuthService, private firestore: AngularFirestore) {
  }
  ngOnInit() {
      this.loadUserData();
  }
  loadUserData(){
    var that =  this;
    this.auth.getCurrentUserData().subscribe(data =>{
      console.log(data.fullname);
      that.user["fullname"] = data.fullname;
      that.user["gender"] = data.gender;
      that.user["phone"] = data.phone;
      that.user["email"] = that.auth.getCurrentEmail();

    });
  }
  getEditing() {
    // this.isEditing = !this.isEditing;
    this.message = '';

    return !this.isEditing;
  }
  saveUser() {
    this.message = 'Successfully Saved';
    this.isEditing = !this.isEditing;
    console.log(this.message);
  }
  setEditing() {
    this.message = '';
    this.isEditing = !this.isEditing;
  }

}
