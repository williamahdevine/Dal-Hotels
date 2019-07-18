import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { BookingHistory } from '../app/models/BookingHistory';
import { UpcomingBookings } from '../app/models/UpcomingBookings';

@Injectable({
  providedIn: 'root'
})
export class BookingRecordService {
  
  historyUrl:string = '../../assets/data/bookingHistory.json';
  upcomingUrl:string = '../../assets/data/upcomingBookings.json';

  constructor(private http:HttpClient) { }

  getHistory():Observable<BookingHistory[]> {
      return this.http.get<BookingHistory[]>(this.historyUrl);
  }
  getUpcoming():Observable<UpcomingBookings[]> {
      return this.http.get<UpcomingBookings[]>(this.upcomingUrl);
  }
}
