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
  constructor(private service: AvaliableRoomServiceService) {
  }

  ngOnInit() {
    this.ind = this.service.getIndex();
    // this.rooms = this.roomService.getRooms();
    this.service.getRooms().subscribe(actionArray => {
      this.rooms = actionArray.map(item => {
        // if (item.payload.doc.id === '5f31RvF6LKJCghBQJnPT') {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as AvailableRoom;
        // }
      });
      console.log(this.rooms);
    });
  }

// getIndex() {
//     return 0;
// }
  genRandomNum() {
    this.currentImg = Math.floor(Math.random() * 6) + 1;
  }

  changeImage(image_number: number) {
    this.currentImg = image_number;
  }
}
