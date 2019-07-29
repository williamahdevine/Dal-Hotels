// By Shuo
import { HttpClient } from '@angular/common/http';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentSnapshot} from '@angular/fire/firestore';
import {Component, OnInit, Pipe} from '@angular/core';
import { BookingRecordService } from '../booking-record.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { BookingHistory } from '../models/BookingHistory';
import { UpcomingBookings } from '../models/UpcomingBookings';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import {Task} from 'protractor/built/taskScheduler';
import {FirebaseFirestore} from '@angular/fire';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-booking-records',
  templateUrl: './booking-records.component.html',
  styleUrls: ['./booking-records.component.css']
})

export class BookingRecordsComponent implements OnInit {
  bookingHistory: BookingHistory[] = [];
  upcomingBookings: UpcomingBookings[] = [];
  show;
  private now: Date;
  private myFormattedDate: any;
  pipe = new DatePipe('en-US');

  constructor(
    private bookingsService: BookingRecordService,
    public db: AngularFirestore,
    private http: HttpClient,
    public auth: AuthService
  ) {
    this.now = new Date();
    this.myFormattedDate = this.pipe.transform(this.now, 'yyMMdd');

    this.db.collection<BookingHistory>('bookingRecord').valueChanges().forEach(r => {
      let i = 0;
      for (const data of r) {
        console.log(data.status);
        if (data.uid === 'Ftf1lFhmfafrgRUEZqf4r8p9UZk2' && this.myFormattedDate > data.date) {
          this.bookingHistory[i] = data;
          console.log(data);
          i = i + 1;
        }
      }
      i = 0;
      for (const data of r) {
        console.log(data.status);
        if (data.uid === 'Ftf1lFhmfafrgRUEZqf4r8p9UZk2' && this.myFormattedDate < data.date) {
          this.upcomingBookings[i] = data;
          i = i + 1;
        }
      }
    });
  }

  ngOnInit() {}

  showHistory() {
    this.show = false;
    // alert("history");
  }
  cancel(booking, index) {
    const option = confirm('Are you sure ?');
    // tslint:disable-next-line: whitespace
    if (option) {
      this.db.collection('upcomingBooking').doc(index).set({
        date: booking.date,
        nights: booking.nights,
        price: booking.price,
        status: !booking.status
      });
      alert('Cancelled');
    }
  }

  showUpcoming() {
    this.show = true;
    // alert("upcoming");
  }
  sendMail() {
    // alert(
    //   this.http.get("localhost:3000/send").subscribe(res => {
    //     alert("Sent");
    //   })
    // );
    alert('Sent');
  }
}
