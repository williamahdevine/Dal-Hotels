import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AvaliableRoomServiceService } from '../models/avaliable-room-service.service';
import { BookingService } from '../models/booking.service';
import { AvailableRoom } from '../shared/available-room.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

declare let paypal: any;

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
  public startDate : string;
  public endDate : string;

  constructor(private service: AvaliableRoomServiceService,private booking :BookingService,  private route: ActivatedRoute,private router: Router) {
  }

  ngOnInit() {
    // this.rooms = this.roomService.getRooms();
    this.setDates();
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

  setDates(){
    var date = new Date();
    var month = date.getMonth()+1;
    this.startDate = date.getFullYear()+"-"+month+"-"+date.getDate();
    date.setFullYear(date.getFullYear()+1)
    this.endDate = date.getFullYear()+"-"+month+"-"+date.getDate();
  }
  payOnCheckIn(){
    var empty = [];
    for(var room of this.RoomViews){
      this.booking.payOnCheckInBook(room,this.nightArray[room["id"]],false);
    }
    localStorage.removeItem("booking");
    this.RoomsData = empty;
    this.RoomViews = empty;
    alert("Booking Complete");
    //  location.href = '/';
    this.router.navigate(["/"]);

  }

  pay(){
    var empty = [];
    for(var room of this.RoomViews){
      this.booking.payOnCheckInBook(room,this.nightArray[room["id"]],true);
    }
    localStorage.removeItem("booking");
    this.RoomsData = empty;
    this.RoomViews = empty;
    this.router.navigate(["/"]);
  }

  buildTable(){
    var that =  this;
    for(var itemKey of this.RoomsData){
      var room = this.booking.getRoom(itemKey);
      room.subscribe(data=>{
        var item =[];
        item["beds"]=data.data().beds;
        item["cost"]=data.data().cost;
        item["details"]=data.data().details;
        console.log(that.startDate);
        item["date"]=that.startDate;
        item["hotel_id"]=data.data().hotel_id;
        item["no_of_guests"]=data.data().beds;
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
    var that = this;
    paypal.Buttons({

      // Set up the transaction
      createOrder: function(data, actions) {
          return actions.order.create({
              purchase_units: [{
                  amount: {
                      value: ''+that.totalBookingCost()+''
                  }
              }]
          });
      },

      // Finalize the transaction
      onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
              // Show a success message to the buyer
              that.pay();
              alert('Booking Complete');
              // location.href="/";
          });
      }


  }).render('#paypal-button');
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

  dateChecker(date,index){
    var currentDate = new Date(date);
    var minDate = new Date(this.startDate);
    var endDate = new Date(this.endDate);

    if(currentDate < minDate || currentDate > endDate){
      date = currentDate;
      this.RoomViews[index]["date"] = currentDate;
      alert("Invalid Date Selected");
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
    
    // alert('Booking Complete');
    // location.href = '/';
  }


  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
