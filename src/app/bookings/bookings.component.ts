import { Component, OnInit } from '@angular/core';
import { AvaliableRoomServiceService } from '../avaliable-room-service.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AvailableRoom } from '../shared/available-room.model';

import { AvaliableRoomService } from '../models/avaliable-room.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  public rooms: AvailableRoom[];
  public nightArray = [1, 2, 3];
  public total = 1000;
  public cardNumber: number;
  public cardPin: number;
  public cardCVV: number;
  public cardDate: string;
  public isRedeemed = false;
  public RedeemedStatus = 'Activate With Reward Points';
  public totalReduce: number;

  constructor(private service: AvaliableRoomServiceService) {
  }

  ngOnInit() {
    // this.rooms = this.roomService.getRooms();
    this.service.getRooms().subscribe(actionArray => {
      this.rooms = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as AvailableRoom;
      });
      // console.log(this.rooms);
    });
  }

  Redeemed() {
    if (this.isRedeemed == false) {
      this.totalReduce = (this.total / 10);
      this.total = this.total - (this.total / 10);
      this.isRedeemed = true;
      this.RedeemedStatus = 'Deactivate Reward';
    } else {
      this.isRedeemed = false;
      this.RedeemedStatus = 'Activate With Reward Points';
      this.total = this.total + this.totalReduce;

    }
  }

  CancelBooking(roomNumber: number) {
    alert('Item Removed');
    document.getElementById(roomNumber + '').style.display = 'none';
  }

  BookingComplete() {
    alert('Booking Complete');
    location.href = '/';
  }


  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
