import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RoomSearchService {

  //the constructor is called with the Angular Fire Store Module
  constructor(private firestore: AngularFirestore) { }
  //This is where the variables are declared 
  public rooms = [];
  public ratings = [];
  public beds = [];
  public sizes = [];
  public locations = [];
  public priceRange = [];

  //This gets all the hotel locations from the database
  getAllLocations(){
    var that = this;
    this.firestore.collection("hotels").snapshotChanges().subscribe(data=>{
        var count = 0;
        for(var location in data){
          var city = data[location].payload.doc.data()["City"]; 
          if(that.isInLocation(city)){
            that.locations[count] = data[location].payload.doc.data()["City"];
            count = count + 1;
          }
        }
    })
    return this.locations;
  }

  //This checks if a location is set
  isInLocation(city){
    var result = true;
    for(var location in this.locations){
      if(city === this.locations[location]){
        result=false;
      }
    }
    return result;
  }

  //This returns the Price ranges for the rooms 
  getPriceRange(){
    this.priceRange["All Price Ranges"] = {min:0,max:1000000};
    this.priceRange["$0 - $500"] = {min:0,max:500};
    this.priceRange["$500 - $1000"] = {min:500,max:1000};
    this.priceRange["$1000 - $1500"] = {min:1000,max:1500};
    this.priceRange["$1500 - $2000"] = {min:1500,max:2000};
    this.priceRange["$2500 - $3000"] = {min:2500,max:3000};
    this.priceRange["$3000 - $3500"] = {min:3000,max:3500};
    this.priceRange["$4000 - $4500"] = {min:4000,max:4500};
    this.priceRange["$4500 - $5000"] = {min:4500,max:5000};
    this.priceRange["$5000 - $5500"] = {min:5000,max:5500};
    this.priceRange["$5500 - $6000"] = {min:5500,max:6000};
    this.priceRange["$6000 - ^"] = {min:6000,max:1000000};
    return this.priceRange;
  }

  //This returns all the possible ratings 
  getAllRatings(){
    if(this.ratings.length==0){
      for(var i = 1 ; i <= 5; i++){
        this.ratings.push(i);
      }
    }
    return this.ratings;
  }

  //This gets all the possible number of beds in the hotels 
  getAllBeds(){
    if(this.beds.length==0){
      for(var i = 1 ; i <= 5; i++){
        this.beds.push(i);
      }
     }
    return this.beds;
  }

  //This returns an array of room sizes 
  getAllSizes(){
    if(this.sizes.length==0){
      this.sizes.push("small");
      this.sizes.push("medium");
      this.sizes.push("large");
    }
    return this.sizes;
  }

  //This get all the rooms from the cloud store 
  getAllRooms(){
    var that = this;
    this.firestore.collection("rooms").snapshotChanges().subscribe(data=>{
        for(var room in data){
          that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
        }
    })
    return this.rooms;
  }

  //This function is used to search the cloud store database for the queries sent by the user  
  alt_search(){
    var that = this;
    let data = sessionStorage.getItem('searchData');
    var notFound = true;
    if(data){
      var sessionData = JSON.parse(data);
      var Ratings = sessionData["Ratings"];
      var Locations = sessionData["Locations"];
      var priceRange = sessionData["price_range"];
      var priceMin = sessionData["price_data"].min;
      var priceMax = sessionData["price_data"].max;
      var roomSize = sessionData["Room Sizes"];
      var numberOfBeds= sessionData["numberOfBeds"];
      
      var db; 
      db = this.firestore.collection("rooms").ref;
      if(this.isLocationsFiltered(Locations)){
        db = db.where('location','==',Locations);
      }
      if(this.isNumberOfBedsFiltered(numberOfBeds)){
        db = db.where('beds','==',numberOfBeds);
      }
      if(this.isRoomSizeFiltered(roomSize)){
        db = db.where('size','==',roomSize);
      }
      if(this.isRatingsFiltered(Ratings)){
        db = db.where('ratings','==',Ratings);
      }
      if(this.isPriceRangeFiltered(priceRange)){
        db = db.where('cost','>=',priceMin).where('cost','<=',priceMax);
      }
    
      db.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          notFound=false;
          that.rooms[doc.id]= doc.data();
        });
    });
    sessionStorage.setItem("notFound",""+notFound);
      return this.rooms;
    }
  }

  getRecommendedRooms(){
    this.rooms = [];
    var db; 
    var that = this;
    db = this.firestore.collection("rooms").ref.where('ratings','==',5).limit(6);
    db.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        that.rooms[doc.id]= doc.data();
      });
  });
  return this.rooms;
  }

  //this checks if the Ratings have been filtered 
  isRatingsFiltered(Ratings){
    var result = true;
    if(Ratings==="All Ratings"){
      result = false
    }
    return result;
  }

  //this checks if the Location have been filtered 
  isLocationsFiltered(Locations){
    var result = true;
    if(Locations==="All Locations"){
      result = false
    }
    return result;
  }

  //this checks if the Price range has been filtered 
  isPriceRangeFiltered(PriceRange){
    var result = true;
    if(PriceRange==="All Price Ranges"){
      result = false
    }
    return result;
  }

  //this checks if the room size has been filtered 
  isRoomSizeFiltered(RoomSize){
    var result = true;
    if(RoomSize==="All Room Sizes"){
      result = false
    }
    return result;
  }

  //this checks if the number of beds has been filtered 
  isNumberOfBedsFiltered(numberOfBeds){
    var result = true;
    if(numberOfBeds==="All Bed Sizes"){
      result = false
    }
    return result;
  }


}
