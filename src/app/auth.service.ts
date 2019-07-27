import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firestore: AngularFirestore,private fireauth : AngularFireAuth) { }

  signUP(userInfo){
    var result = '';
    var that = this;
    return this.fireauth.auth.createUserWithEmailAndPassword(userInfo.email,userInfo.password)

    
  }

  getCurrentID(){
    return this.fireauth.auth.currentUser.uid;
  }
  login(email,password){
    return this.fireauth.auth.signInWithEmailAndPassword(email,password);
  }

  signOut(){
    return this.fireauth.auth.signOut();
  }

  checkLoginStatus(){
    return this.fireauth.auth;
  }
}
