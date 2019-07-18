// William Devine
// Import all required libraries.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AvaliableRoomService } from './models/avaliable-room.service';
import { AvailableRoom } from './shared/available-room.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AvaliableRoomServiceService {
  index: number;


  // Initialize firebase and httpclient.
  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  // getRooms() method returns a snapshot of the collection of data 'rooms' from firebase.
  getRooms() {
    return this.firestore.collection('rooms').snapshotChanges();
  }

  getDetailsId() {
    return localStorage.getItem('i');
  }

  viewDetails(i) {
    console.log('i = ' + i);
    this.index = i;
    localStorage.setItem('i', i);
  }



}
