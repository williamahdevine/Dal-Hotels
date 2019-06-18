import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaliableRoomService {

  constructor(
    public number: number,
    public size: string,
    public beds: number,
    public cost: number,
    public img: string,
    public img1: string,
    public img2: string,
    public img3: string,
    public img4: string,
    public img5: string,
    public img6: string,
    public details: string,
  ) { }
}
