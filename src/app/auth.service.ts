import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private phone: string;
  constructor(private firestore: AngularFirestore, private fireauth: AngularFireAuth) { }

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
    const document: AngularFirestoreDocument = this.firestore.doc('users/' + this.fireauth.auth.currentUser.uid);
    const document$: Observable<any> = document.valueChanges();
    return document$;
  }
  login(email, password) {
    return this.fireauth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.fireauth.auth.signOut();
  }

  checkLoginStatus() {
    return this.fireauth.auth;
  }
}
