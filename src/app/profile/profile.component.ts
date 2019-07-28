import { Component, OnInit } from '@angular/core';
import { UserService } from '../models/user.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AuthService } from '../auth.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {SignUpService} from '../models/sign-up.service';


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

  model = {fullname: '', gender: '', phone: '', email: ''};


  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

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
    console.log(this.model);
    if (this.model.fullname === '') {
      this.model.fullname = this.user["fullname"];
    }
    if (this.model.gender === '') {
      this.model.gender = this.user["gender"];
    }
    if (this.model.phone === '') {
      this.model.phone = this.user["phone"];
    }
    if (this.model.email === '') {
      this.model.email = this.user["email"];
    }

    this.itemDoc.update(this.model);
    this.message = 'Successfully Saved';
    this.isEditing = !this.isEditing;
    this.auth.updateEmail(this.model.email);
  }
  setEditing() {
    this.message = '';
    this.isEditing = !this.isEditing;
  }

}
