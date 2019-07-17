// William Devine
// Import all required libraries.
import { Component, OnInit } from '@angular/core';
import { AvaliableRoomServiceService } from '../avaliable-room-service.service';
import { AvailableRoom } from '../shared/available-room.model';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AvaliableRoomService } from '../models/avaliable-room.service';

@Component({
  selector: 'app-available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.css']
})
export class AvailableRoomComponent implements OnInit {
  // rooms array of type availableRooms. This will hold all of the available rooms.
  rooms: AvailableRoom[];

  // Initialize the room service.
  constructor(private service: AvaliableRoomServiceService) { }

  // When the page is initialized:
  ngOnInit() {

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
    });
  }

  viewDetails(i) {
    this.service.viewDetails(i, '5f31RvF6LKJCghBQJnPT');
  }
  test(i) {
    this.service.test(i);
  }
  // Returns a random number 1-6
  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
