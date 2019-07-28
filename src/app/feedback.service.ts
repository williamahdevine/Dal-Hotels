import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

import { Feedback } from '../app/models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbackUrl:string = '../../assets/data/reviews.json';

  constructor(private http:HttpClient, private firestore: AngularFirestore) { }

  getFeedback():Observable<Feedback[]> {
      return this.http.get<Feedback[]>(this.feedbackUrl);
  }

  sendContactUs(value){
    return this.firestore.collection("contact_messages").add(value);
  }
}
