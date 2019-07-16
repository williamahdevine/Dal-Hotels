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
  rooms: AvailableRoom[];

  constructor(private service: AvaliableRoomServiceService) { }

  ngOnInit() {
    this.service.getRooms().subscribe(actionArray => {
      this.rooms = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as AvailableRoom;
      });
       console.log(this.rooms[0].id);
    });
  }

  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
