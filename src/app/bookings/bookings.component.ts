import { Component, OnInit } from '@angular/core';
import { AvaliableRoomServiceService } from '../avaliable-room-service.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AvaliableRoomService } from '../models/avaliable-room.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  public rooms:AvaliableRoomService[];
  public nightArray =[1,2,3];
  public total:number = 1000;
  public cardNumber:number;
  public cardPin:number;
  public cardCVV:number;
  public cardDate:string;
  public isRedeemed:boolean=false;
  public RedeemedStatus:string="Activate With Reward Points";
  public totalReduce:number;

	constructor(private roomService:AvaliableRoomServiceService) { }

	ngOnInit() {
		// this.rooms = this.roomService.getRooms();
		this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      console.log(this.nightArray);
    });

  }
  Redeemed(){
    if(this.isRedeemed==false){
      this.totalReduce = (this.total/10);
      this.total = this.total - (this.total/10);
      this.isRedeemed = true;
      this.RedeemedStatus="Deactivate Reward";
    }else{
      this.isRedeemed = false;
      this.RedeemedStatus="Activate With Reward Points";
      this.total = this.total + this.totalReduce;
      
    }
  }
  CancelBooking(roomNumber:number){
    alert("Item Removed");
    document.getElementById(roomNumber+"").style.display="none";
  }
  BookingComplete(){
    alert("Booking Complete");
    location.href="/"
  }


	genRandomNum() {
	    return Math.floor(Math.random() * 6) + 1 ;
	}
}
