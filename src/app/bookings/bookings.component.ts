import { Component, OnInit } from '@angular/core';
import { AvaliableRoomServiceService } from '../avaliable-room-service.service';
import { BookingService } from '../booking.service';
import { AvailableRoom } from '../shared/available-room.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  public rooms: AvailableRoom[];
  public nightArray = [];
  public total = 1000;
  public cardNumber: number;
  public cardPin: number;
  public cardCVV: number;
  public cardDate: string;
  public isRedeemed = false;
  public RedeemedStatus = 'Activate With Reward Points';
  public totalReduce: number;
  public RoomID;
  public RoomsData = [];
  public NewRoom;
  public RoomViews = [];

  constructor(private service: AvaliableRoomServiceService,private booking :BookingService,  private route: ActivatedRoute,private router: Router) {
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
    });
    this.RoomID = this.route.snapshot.paramMap.get('id');

    this.localStorageChecker();
  }
  localStorageChecker(){
    if(!localStorage.getItem("booking")){
      //empty Storage
      if(!this.contains(this.RoomID,this.RoomsData)){
      this.RoomsData.push(this.RoomID);
      }
      localStorage.setItem("booking",JSON.stringify(this.RoomsData));
    }else{
      //Contains Data
      this.RoomsData = JSON.parse(localStorage.getItem("booking"));
      if(!this.contains(this.RoomID,this.RoomsData)){
      this.RoomsData.push(this.RoomID);
      }
      localStorage.setItem("booking",JSON.stringify(this.RoomsData));
    }
    this.buildTable();
    
  }

  contains(value,array){
    var result = false;
    for(var v of array){
      if(v == value){
        return true;
      }
    }
    return result;
  }

  payOnCheckIn(){
    var empty = [];
    for(var room of this.RoomViews){
      this.booking.payOnCheckInBook(room,this.nightArray[room["id"]]);
    }
    localStorage.removeItem("booking");
    this.RoomsData = empty;
    this.RoomViews = empty;
    alert("Booking Complete");
    location.href = '/';

  }

  buildTable(){
  
    for(var itemKey of this.RoomsData){
      var room = this.booking.getRoom(itemKey);
      room.subscribe(data=>{
        var item =[];
        item["beds"]=data.data().beds;
        item["cost"]=data.data().cost;
        item["details"]=data.data().details;
        item["hotel_id"]=data.data().hotel_id;
        item["img"]=data.data().img;
        item["img1"]=data.data().img1;
        item["img2"]=data.data().img2;
        item["img3"]=data.data().img3;
        item["img4"]=data.data().img4;
        item["img5"]=data.data().img5;
        item["img6"]=data.data().img6;
        item["location"]=data.data().location;
        item["number"]=data.data().number;
        item["ratings"]=data.data().ratings;
        item["size"]=data.data().size;
        item["id"]=data.id;
        this.nightArray[item["id"]]=1;
        this.RoomViews.push(item);
        
      });
    }
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

  CancelBooking(roomNumber) {
    alert('Item Removed');
    var tempRoomViews = [];
    var tempId = [];
    for(var room of this.RoomViews){
      console.log(room["id"]+" "+roomNumber);
      if(room["id"]!=roomNumber){
        tempRoomViews.push(room);
        tempId.push(room["id"]);
      }
    }
    this.RoomViews = tempRoomViews;
    document.getElementById(roomNumber).style.display = 'none';
    this.RoomsData = tempId;
    localStorage.setItem("booking",JSON.stringify(this.RoomsData));
    console.log(this.RoomViews);
  }

  totalBookingCost(){
    var result = 0;
    for(var room of this.RoomViews){
      result = result +(room["cost"]*this.nightArray[room["id"]]);
    }
    return result;
  }

  BookingComplete() {
    alert('Booking Complete');
    location.href = '/';
  }


  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
