import { FirebaseService } from "./services/firebase.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AvaliableRoomService } from "./models/avaliable-room.service";

@Injectable({
  providedIn: "root"
})
export class AvaliableRoomServiceService {
  roomsUrl: string = "../../assets/data/rooms.json";

  constructor(private http: HttpClient, private fs: FirebaseService) {}

  getRooms() {
   let rooms=this.fs.getRooms();
console.log(rooms);
  }
}
