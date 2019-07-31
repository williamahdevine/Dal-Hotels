import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private firestore: AngularFirestore, private auth : AngularFireAuth)  { }
  getRoom(room_id){

    return this.firestore.collection("rooms").doc(room_id).get();

  }

  payOnCheckInBook(Room,nights,payStatus){
    var doc = this.firestore.createId();
    var user_email = this.auth.auth.currentUser.email;
    var user_ID = this.auth.auth.currentUser.uid;
    return this.firestore.collection("Bookings").add({Room_id:Room["id"],beds:Room["beds"],numberOfNights:nights,user_email:user_email,user_id:user_ID,isPaid:payStatus,check_in_time:Room["date"],number_of_guests:Room["no_of_guests"],is_checked_in:false});
  }

  getBookingData(){
    var user_id = this.auth.auth.currentUser.uid; 
    return this.firestore.collection("Bookings").ref.where("user_id","==",user_id).get();
  }

  getRoomData(room_id){
    return this.firestore.collection("rooms").ref.doc(room_id).get();
  }

  checkID(booking_id){
    return this.firestore.collection("Bookings").doc(booking_id).update({is_checked_in:true})
  }

  cancelUpcoming(booking_id){
    return this.firestore.collection("Bookings").doc(booking_id).delete();
  }

}
