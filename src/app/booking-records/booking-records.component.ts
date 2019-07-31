// By Shuo
import { HttpClient } from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot} from '@angular/fire/firestore';
import {Component, OnInit, Pipe} from '@angular/core';
import { BookingRecordService } from '../models/booking-record.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { BookingHistory } from '../models/BookingHistory';
import { UpcomingBookings } from '../models/UpcomingBookings';
import { AuthService } from '../models/auth.service';
import { Observable } from 'rxjs';
import {Task} from 'protractor/built/taskScheduler';
import {FirebaseFirestore} from '@angular/fire';
import {DatePipe} from '@angular/common';
import { BookingService } from '../models/booking.service';

@Component({
  selector: 'app-booking-records',
  templateUrl: './booking-records.component.html',
  styleUrls: ['./booking-records.component.css']
})

export class BookingRecordsComponent implements OnInit {
  history = [];
  upcoming = [];
  show;
  private now: Date;
  private myFormattedDate: any;
  pipe = new DatePipe('en-US');
  public history_message;
  public upcoming_message;

  constructor(
    private bookingsService: BookingRecordService,
    public db: AngularFirestore,
    private http: HttpClient,
    public auth: AuthService,
    public bookings : BookingService
  ) {

  }

  ngOnInit() {
    this.getUserData()
  }

  getUserData(){
    var that = this;
    var has_upcoming = false;
    var has_history = false;
    
    this.bookings.getBookingData().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        if(doc.data().is_checked_in){
          has_history = true;
          var booking = [];
          booking["date"] = doc.data().check_in_time;
          booking["email"] = doc.data().user_email;
          that.bookings.getRoomData(doc.data().Room_id).then(function(data){
            booking["price"] = data.data().cost * doc.data().numberOfNights;
          }).catch(function (err){
            console.log(err);
          })
          booking["points"] = 1;
          that.history.push(booking);
        }else{
            has_upcoming = true;
            var booking = [];
            booking["date"] = doc.data().check_in_time;
            booking["id"] = doc.id;
            that.bookings.getRoomData(doc.data().Room_id).then(function(data){
            booking["price"] = data.data().cost * doc.data().numberOfNights;
          }).catch(function (err){
            console.log(err);
          })
          booking["nights"] = doc.data().numberOfNights;
          that.upcoming.push(booking);
        }
      });
  }).catch(err =>{
      console.log(err);
    }).finally(function(){
      if(!has_upcoming){
        that.upcoming_message = "No Records Yet";
      }

      if(!has_history){
        that.history_message = "No Records Yet"
      }
    });
  }

  showHistory() {
    this.show = false;
    // alert("history");
  }
  cancel(booking_id, index) {
    const option = confirm('Are you sure ?');
    // tslint:disable-next-line: whitespace
    var that = this;
    if (option) {
      this.bookings.cancelUpcoming(booking_id).then(data =>{
        that.upcoming = [];
        that.history = [];
        that.getUserData();
      })
      alert('Cancelled');
    }
  }

  showUpcoming() {
    this.show = true;
    // alert("upcoming");
  }
  sendMail(email) {
      this.http.get("http://129.173.22.35:35001/"+email).subscribe(res => {
        alert("Sent");
      });
  }

  checkIn(id){
    var that = this;
    this.bookings.checkID(id).then(data =>{
      that.upcoming = [];
      that.history = [];
      that.getUserData();
    })
  }
}
