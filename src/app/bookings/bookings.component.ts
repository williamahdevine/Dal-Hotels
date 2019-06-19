import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings.service';

import { BookingHistory } from '../models/BookingHistory';
import { UpcomingBookings } from '../models/UpcomingBookings';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
    bookingHistory:BookingHistory[];
    upcomingBookings:UpcomingBookings[];

    show;

    constructor(private bookingsService:BookingsService) { }

    ngOnInit() {
        this.bookingsService.getHistory().subscribe(bookingHistory => {
            this.bookingHistory = bookingHistory;
        });

        this.bookingsService.getUpcoming().subscribe(upcomingBookings => {
            this.upcomingBookings = upcomingBookings;
        });
    }

    showHistory(){
        this.show = false;
        // alert("history");
    }

    showUpcoming(){
        this.show = true;
        // alert("upcoming");
    }
}
