// William Devine
// Import all required libraries.
import { Component, OnInit } from '@angular/core';
import { AvaliableRoomServiceService } from '../avaliable-room-service.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AvaliableRoomService } from '../models/avaliable-room.service';
import { AvailableRoom } from '../shared/available-room.model';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {

  rooms: AvailableRoom[];
  currentImg: number;
  ind: number;
  id: number;

  constructor(private service: AvaliableRoomServiceService) {
  }

  ngOnInit() {
    // Will retreive the index of the room (selected room)
    this.ind = +this.service.getDetailsId();
    console.log('I = ' + this.service.getDetailsId());

    // This will call the getRoom() method from the AvailableRoom service.
    // By subscribing the data will be updating without the user having to refresh.
    // It will put all of the data into the rooms array and formatted as a available room model.
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

  // Generate random num 1-6
  genRandomNum() {
    this.currentImg = Math.floor(Math.random() * 6) + 1;
  }

  changeImage(image_number: number) {
    this.currentImg = image_number;
  }
}
