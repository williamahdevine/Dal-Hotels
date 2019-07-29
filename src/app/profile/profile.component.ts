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
  user: { fullname: string; gender: string; email: string; phone: string };
  isEditing = false;
  message = '';

  model = {fullname: '', gender: '', phone: '', email: ''};


  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(public auth: AuthService, private firestore: AngularFirestore) {
    this.itemDoc = this.firestore.doc('users/' + this.auth.getCurrentID());
    this.item = this.itemDoc.valueChanges();

    auth.getCurrentUserData().subscribe(data =>
      this.user = {
        fullname: data.fullname,
        gender: data.gender,
        email: auth.getCurrentEmail(),
        phone: data.phone

      }
    );
  }
  ngOnInit() {  this.model = {fullname: '', gender: '', phone: '', email: ''};
  }
  getEditing() {
    // this.isEditing = !this.isEditing;
    this.message = '';

    return !this.isEditing;
  }
  saveUser() {
    console.log(this.model);
    if (this.model.fullname === '') {
      this.model.fullname = this.user.fullname;
    }
    if (this.model.gender === '') {
      this.model.gender = this.user.gender;
    }
    if (this.model.phone === '') {
      this.model.phone = this.user.phone;
    }
    if (this.model.email === '') {
      this.model.email = this.user.email;
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
