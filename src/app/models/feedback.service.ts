import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Feedback } from './Feedback';

@Injectable({
  providedIn: 'root' 
})
export class FeedbackService {
  feedbackUrl:string = '../../assets/data/reviews.json';

  constructor(private http:HttpClient, private firestore: AngularFirestore, private fireauth: AngularFireAuth) { }

  getFeedback():Observable<Feedback[]> {
      return this.http.get<Feedback[]>(this.feedbackUrl);
  }

  sendContactUs(value){
    return this.firestore.collection("contact_messages").add(value);
  }
  addNewsLetter(email){
    var uid = this.fireauth.auth.currentUser.uid;
    var data = {email:email,is_subscribed:true}
    return this.firestore.collection("newsletter_subscribers").doc(uid).set(data);
  }

  NewLetterHasEmail(email){
    return this.firestore.collection("newsletter_subscribers").ref.where("email","==",email).get();
  }

  getNewletterStatus(){
    var uid = this.fireauth.auth.currentUser.uid;
    return this.firestore.collection("newsletter_subscribers").doc(uid).valueChanges();

  }
}
