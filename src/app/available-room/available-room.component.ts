import { Component, OnInit } from '@angular/core';
import data from './rooms.json';

@Component({
  selector: 'app-available-room',
  templateUrl: './available-room.component.html',
  styleUrls: ['./available-room.component.css']
})
export class AvailableRoomComponent implements OnInit {

	rooms: Room[] = data;


	// randomNumImg: string = ( ( Math.floor(Math.random())) + 1  )  + '.jpg';

	constructor() { }

	ngOnInit() {
	}

	genRandomNum() {
	    return Math.floor(Math.random() * 6) + 1 ;
	}

}
