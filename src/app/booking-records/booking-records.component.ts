//By Shuo 
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit } from "@angular/core";
import { BookingRecordService } from "../booking-record.service";

import { BookingHistory } from "../models/BookingHistory";
import { UpcomingBookings } from "../models/UpcomingBookings";

@Component({
  selector: "app-booking-records",
  templateUrl: "./booking-records.component.html",
  styleUrls: ["./booking-records.component.css"]
})
export class BookingRecordsComponent implements OnInit {
  bookingHistory: BookingHistory[];
  upcomingBookings: UpcomingBookings[];

  show;

  constructor(
    private bookingsService: BookingRecordService,
    public db: AngularFireDatabase,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.db
      .list<BookingHistory>("/bookingHistory")
      .valueChanges()
      .forEach(r => {
        // this.rooms.push(r);
        this.bookingHistory = r;
        console.log(r);
      });
    this.db
      .list<UpcomingBookings>("/upcomingBooking")
      .valueChanges()
      .forEach(r => {
        // this.rooms.push(r);
        this.upcomingBookings = r;
        console.log(r);
      });
  }

  showHistory() {
    this.show = false;
    // alert("history");
  }
  cancel(booking,index) {
    let option = confirm("Are you sure ?");
    // tslint:disable-next-line: whitespace
    if (option) {
      this.db.object("/upcomingBooking/"+index).update({
        date: booking.date,
        nights: booking.nights,
        price: booking.price,
        status: !booking.status
      });
      alert("Cancelled ");
    }
  }

  showUpcoming() {
    this.show = true;
    // alert("upcoming");
  }
  sendMail() {
    alert(
      this.http.get("http://localhost:3000/send").subscribe(res => {
        alert("Sent");
      })
    );
  }
}
