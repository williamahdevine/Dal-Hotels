import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private firestore: AngularFirestore) { }
  getRoom(room_id){

    return this.firestore.collection("rooms").doc(room_id).get();

  }

  payOnCheckInBook(Room,nights){
    var doc = this.firestore.createId();
    var ref = this.firestore.collection("Bookings").add({Room_id:Room["id"],beds:Room["beds"],numberOfNights:nights,user_email:"hello@dalhotels.com"});
  }
}
