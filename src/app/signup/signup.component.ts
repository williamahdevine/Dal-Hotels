import { Component, OnInit } from '@angular/core';
import { SignUpService } from '../models/sign-up.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth: AuthService, private firestore: AngularFirestore) { }

  model = new SignUpService('', '', '', '', '', '');

  submitted = false;

  onSubmit() {
    this.submitted = true;
    const that = this;
    const signup = this.auth.signUP(this.model).then(data => {
      that.firestore.collection('users').doc(that.auth.getCurrentID()).set({
        fullname: that.model.name,
        gender: that.model.gender,
        phone: that.model.phone
      }).then(data => {
        location.href = '/';
      }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
      console.log(error);
      alert(error.message);

    });
    }

  ngOnInit() {
      this.model = new SignUpService('', '', '', 'Male', '', '');
  }
}
