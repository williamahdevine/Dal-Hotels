// Author: Javadi Nithisha (B00824058)

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Feedback } from '../shared/feedback';
import { AngularFirestore ,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../models/auth.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  //creating instances
  title1: string;
  name1: string;
  comment1: string;
  rating1: string;
  date1: string;
  submitted = false;
FeedbackColl: AngularFirestoreCollection<Feedback>;
Feedbacks:Observable<Feedback[]>;

// Introducting AngularFireDatabase Dependency into the Constructor
  constructor(public auth: AuthService,private afs: AngularFirestore) { }

//  The code was referred from Coursetro.com. (2019). Use Angular with Google's Cloud Firestore - Tutorial. [online] 
//  Available at: https://coursetro.com/posts/code/94/Use-Angular-with-Google's-Cloud-Firestore---Tutorial [Accessed 13 Jul. 2019].
//  It was used in connecting the cloud firestore, adding the form values to the storage and displaying it in the web page.
//  The code was modified since the above tutorials show connection to the realtime database where as I used cloud based storage
//  Since I have found relevant to my project feature and was self explainatory, thus I have used it in my project with modifications.

  ngOnInit() {
    this.FeedbackColl=this.afs.collection('Feedback');
    this.Feedbacks=this.FeedbackColl.valueChanges();
    this.setUserName();

  }

  //Adding feedbacks to the cloud firestore
  addFeedback(){
    this.submitted = true;
    this.afs.collection('Feedback').add({'Title':this.title1,'User_name':this.name1,'Ratings':this.rating1,'Comments':this.comment1,
  'Date':this.date1})
    // alert message
      alert("Your feedback was added Succesfully");
      this.setUserName();
  }

  //Sorting the feedbacks by Rating

  sortByRating(){
    this.FeedbackColl = this.afs.collection<Feedback>('Feedback', ref => ref.orderBy('Ratings','asc'));
    this.Feedbacks=this.FeedbackColl.valueChanges();
  }

  //Sorting the feedbacks by Date
  sortByDate(){
    this.FeedbackColl = this.afs.collection<Feedback>('Feedback', ref => ref.orderBy('Date','asc'));
    this.Feedbacks=this.FeedbackColl.valueChanges();
  }

  setUserName(){
    var that =  this;
    this.auth.getCurrentUserData().subscribe(data =>{
      that.name1 = data.fullname;
    })
  }
}