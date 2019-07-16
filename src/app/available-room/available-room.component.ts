import { FirebaseService } from "./../services/firebase.service";
import { Component, OnInit } from "@angular/core";

import { AvaliableRoomServiceService } from "../avaliable-room-service.service";
import { SearchFilterComponent } from "../search-filter/search-filter.component";
import { AvaliableRoomService } from "../models/avaliable-room.service";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Component({
  selector: "app-available-room",
  templateUrl: "./available-room.component.html",
  styleUrls: ["./available-room.component.css"]
})
export class AvailableRoomComponent implements OnInit {
  rooms: AvaliableRoomService[];
  constructor(
    private roomService: AvaliableRoomServiceService,
    public db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.db
      .list<AvaliableRoomService>("/rooms")
      .valueChanges()
      .forEach(r => {
        // this.rooms.push(r);
        this.rooms = r;
        console.log(r);
      });
  }

  genRandomNum() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
