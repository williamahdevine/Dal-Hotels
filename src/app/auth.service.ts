import {Injectable, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  get isLoggedIn(): boolean {
    this.userStatus();
    return this._isLoggedIn;
  }
  private phone: string;
  private _isLoggedIn = false;

  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) {}

  ngOnInit() {
    this.userStatus();
  }

  userStatus() {
    const that = this;
    this.fireauth.auth.onAuthStateChanged(user => {
      if (user) {
        that._isLoggedIn = true;
      } else {
        that._isLoggedIn = false;
      }
    });
  }

  signUP(userInfo) {
    const result = '';
    const that = this;
    return this.fireauth.auth.createUserWithEmailAndPassword(userInfo.email, userInfo.password);
  }

  getCurrentID() {
      return this.fireauth.auth.currentUser.uid;
  }
  getCurrentEmail() {
    return this.fireauth.auth.currentUser.email;
  }
  getCurrentUserData() {
    const document: AngularFirestoreDocument = this.firestore.doc('users/' + this.fireauth.auth.currentUser.uid );
    const document$: Observable<any> = document.valueChanges();
    return document$;
  }
  login(email, password) {
    this.userStatus();
    return this.fireauth.auth.signInWithEmailAndPassword(email, password);
  }

  updateEmail(email: string) {
    this.fireauth.auth.currentUser.updateEmail(email);
  }

  signOut() {
    return this.fireauth.auth.signOut();
  }

  checkLoginStatus() {
    return this.fireauth.auth;
  }


}
