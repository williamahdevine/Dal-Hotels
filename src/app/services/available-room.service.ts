import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AvailableRoom } from '../models/AvailableRoom';

@Injectable({
  providedIn: 'root'
})
export class AvailableRoomService {
	roomsUrl:string = '../../assets/data/rooms.json';

  	constructor(private http:HttpClient) { }

	getRooms():Observable<AvailableRoom[]> {
		return this.http.get<AvailableRoom[]>(this.roomsUrl);
	}
}
