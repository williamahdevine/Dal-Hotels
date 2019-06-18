import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AvaliableRoomService } from './models/avaliable-room.service'

@Injectable({
  providedIn: 'root'
})
export class AvaliableRoomServiceService {
  roomsUrl:string = '../../assets/data/rooms.json';

  constructor(private http:HttpClient) { }

getRooms():Observable<AvaliableRoomService[]> {
  return this.http.get<AvaliableRoomService[]>(this.roomsUrl);
}
}
