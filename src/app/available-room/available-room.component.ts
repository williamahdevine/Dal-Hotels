import { Component, OnInit } from '@angular/core';

import { AvaliableRoomServiceService } from '../avaliable-room-service.service';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { AvaliableRoomService } from '../models/avaliable-room.service';

@Component({
  selector: 'app-available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.css']
})
export class AvailableRoomComponent implements OnInit {
  rooms:AvaliableRoomService[];

	constructor(private roomService:AvaliableRoomServiceService) { }

	ngOnInit() {
		// this.rooms = this.roomService.getRooms();
		this.roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
      console.log(this.rooms);
		});
	}

	genRandomNum() {
	    return Math.floor(Math.random() * 6) + 1 ;
	}
}
