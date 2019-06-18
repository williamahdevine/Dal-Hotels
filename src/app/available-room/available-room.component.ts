import { Component, OnInit } from '@angular/core';
import { AvailableRoomService } from '../services/available-room.service';

import { AvailableRoom } from '../models/AvailableRoom';
@Component({
  selector: 'app-available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.css']
})
export class AvailableRoomComponent implements OnInit {
	rooms:AvailableRoom[];

	constructor(private roomService:AvailableRoomService) { }

	ngOnInit() {
		// this.rooms = this.roomService.getRooms();
		this.roomService.getRooms().subscribe(rooms => {
			this.rooms = rooms;
		});
	}

	genRandomNum() {
	    return Math.floor(Math.random() * 6) + 1 ;
	}

}
