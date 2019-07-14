import { Component, OnInit } from '@angular/core';
import { BookingRecordService } from '../booking-record.service';

import { BookingHistory } from '../models/BookingHistory';
import { UpcomingBookings } from '../models/UpcomingBookings';

@Component({
  selector: 'app-booking-records',
  templateUrl: './booking-records.component.html',
  styleUrls: ['./booking-records.component.css']
})
export class BookingRecordsComponent implements OnInit {
  bookingHistory:BookingHistory[];
    upcomingBookings:UpcomingBookings[];

    show;

    constructor(private bookingsService:BookingRecordService) { }

    ngOnInit() {
        this.bookingsService.getHistory().subscribe(bookingHistory => {
            this.bookingHistory = bookingHistory;
          
        });
        this.bookingsService.getUpcoming().subscribe(data => {
          this.upcomingBookings = data;
          console.log(this.upcomingBookings);
        
      });
    }

    showHistory(){
      this.show = false;
      // alert("history");
  }
  cancel(){
    alert("Booking Cancelled");
  }

  showUpcoming(){
      this.show = true;
      // alert("upcoming");
  }
}

