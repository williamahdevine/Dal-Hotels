import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AvaliableRoomService } from './models/avaliable-room.service';
import { AvailableRoom } from './shared/available-room.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AvaliableRoomServiceService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  getRooms() {
    return this.firestore.collection('rooms').snapshotChanges();
  }

}
