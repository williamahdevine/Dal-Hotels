import { Observable } from 'rxjs';
import { Component, Injectable, OnInit } from "@angular/core";
import { AvaliableRoomService } from "../models/avaliable-room.service";
import { User } from "../user";
import { AngularFireModule } from "angularfire2";

import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Injectable({
  providedIn: "root"
})
export class FirebaseService {
  constructor(public db: AngularFireDatabase) {}
  rooms = Array();
  createUser(value) {
    return this.db.list("/users").push({
      name: value.name,
      email: value.email,
      phone: value.phone,
      password: value.password
    });
  }

  getRooms(){
    var arr = [];
    this.db
      .list("/rooms")
      .valueChanges()
      .forEach(r => {
        // this.rooms.push(r);
        this.rooms = r;
        console.log(r);
      });
      //return this.rooms;
    console.log(this.rooms);
  }
}
