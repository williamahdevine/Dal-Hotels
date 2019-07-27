import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  // getRooms() method returns a snapshot of the collection of data 'rooms' from firebase.
  getRooms() {
    return this.firestore.collection('rooms').snapshotChanges();
  }

  getUser() {
    return firebase.auth().currentUser;
  }

}
