//By Shuo 
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Component, OnInit } from "@angular/core";
import { BookingRecordService } from "../booking-record.service";
import { SearchFilterComponent } from '../search-filter/search-filter.component';
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
    public db: AngularFirestore,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.db
      .collection<BookingHistory>("bookingHistory")
      .valueChanges()
      .forEach(r => {
        // this.rooms.push(r);
        this.bookingHistory = r;
        console.log(r);
      });
    this.db
      .collection<UpcomingBookings>("upcomingBookings")
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
      this.db.collection("upcomingBooking").doc(index).set({
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
    // alert(
    //   this.http.get("localhost:3000/send").subscribe(res => {
    //     alert("Sent");
    //   })
    // );
    alert("Sent")
  }
}
