import { AngularFireDatabase } from "angularfire2/database";
import { Component, OnInit } from "@angular/core";
import { AvaliableRoomServiceService } from "../avaliable-room-service.service";
import { SearchFilterComponent } from "../search-filter/search-filter.component";
import { AvaliableRoomService } from "../models/avaliable-room.service";

@Component({
  selector: "app-hotel-details",
  templateUrl: "./hotel-details.component.html",
  styleUrls: ["./hotel-details.component.css"]
})
export class HotelDetailsComponent implements OnInit {
  rooms: AvaliableRoomService[];
  currentImg: number;
  constructor(
    private roomService: AvaliableRoomServiceService,
    public db: AngularFireDatabase
  ) {}

  ngOnInit() {
    // this.rooms = this.roomService.getRooms();
    this.db
      .list<AvaliableRoomService>("/rooms")
      .valueChanges()
      .forEach(r => {
        // this.rooms.push(r);
        this.rooms = r;
        console.log(r);
      });
    this.genRandomNum();
    console.log(this.rooms);
  }

  genRandomNum() {
    this.currentImg = Math.floor(Math.random() * 6) + 1;
  }
  changeImage(Image_number: number) {
    this.currentImg = Image_number;
  }
}
