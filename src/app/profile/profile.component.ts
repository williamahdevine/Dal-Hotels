import { Component, OnInit } from '@angular/core';
import { UserService } from '../models/user.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AuthService } from '../auth.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  title = 'Profile';
  user: { name: string; gender: string; email: string; phone: string };
  isEditing = false;
  message = '';

  constructor(public auth: AuthService, private firestore: AngularFirestore) {
    auth.getCurrentUserData().subscribe(data =>
      this.user = {
        name: data.fullname,
        gender: data.gender,
        email: auth.getCurrentEmail(),
        phone: data.phone

      }
    );
  }
  ngOnInit() {
    console.log(
      this.auth.getCurrentUserData()
      );
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
