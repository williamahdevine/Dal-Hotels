import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class RoomSearchService {

  constructor(private firestore: AngularFirestore) { }
  public tags = [];
  public rooms = [];
  public ratings = [];
  public beds = [];
  public sizes = [];
  public locations = [];
  public priceRange = [];
  
  getAllTags(){
    var that = this;
    this.firestore.collection("tags").snapshotChanges().subscribe(data=>{
        for(var tag in data){
          that.tags[data[tag].payload.doc.id] = data[tag].payload.doc.data();
        }
    })
    return this.tags;
  }
  setRoomLocations(){
    var result=[];
    var locationArray = ["Lagos","Vancover","Halifax","Montreal","Toronto"]
    var that = this;
    this.firestore.collection("rooms").snapshotChanges().subscribe(data=>{
        for(var room in data){
          var id = data[room].payload.doc.id;
          result.push(id);
          var num = locationArray.length;
          var rand = Math.floor(Math.random() * num) + 1
          that.firestore.collection("rooms").doc(id).update(locationArray[rand]);
        }
    });
    return result;
  }

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
  isInLocation(city){
    var result = true;
    for(var location in this.locations){
      if(city === this.locations[location]){
        result=false;
      }
    }
    return result;
  }

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

  getAllRatings(){
    if(this.ratings.length==0){
      for(var i = 1 ; i <= 5; i++){
        this.ratings.push(i);
      }
    }
    return this.ratings;
  }

  getAllBeds(){
    if(this.beds.length==0){
      for(var i = 1 ; i <= 5; i++){
        this.beds.push(i);
      }
     }
    return this.beds;
  }

  getAllSizes(){
    if(this.sizes.length==0){
      this.sizes.push("small");
      this.sizes.push("medium");
      this.sizes.push("large");
    }
    return this.sizes;
  }

  getAllRooms(){
    var that = this;
    this.firestore.collection("rooms").snapshotChanges().subscribe(data=>{
        for(var room in data){
          that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
        }
    })
    return this.rooms;
  }
  alt_search(){
    var that = this;
    let data = sessionStorage.getItem('searchData');
    if(data){
      var sessionData = JSON.parse(data);
      var Ratings = sessionData["Ratings"];
      var Locations = sessionData["Locations"];
      var priceRange = sessionData["price_range"];
      var priceMin = sessionData["price_data"].min;
      var priceMax = sessionData["price_data"].max;
      var roomSize = sessionData["Room Sizes"];
      var numberOfBeds= sessionData["numberOfBeds"];
      // var tag_list = JSON.parse(sessionData["tags"]);
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

    //   db.snapshotChanges().subscribe(data=>{
    //     for(var room in data){
    //       that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
    //     }
    // })
    
      db.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          that.rooms[doc.id]= doc.data();
        });
    });
      return this.rooms;
    }
  }
  Search(){
    var that = this;
    let data = sessionStorage.getItem('searchData');
    if(data){
      var sessionData = JSON.parse(data);
      var Ratings = sessionData["Ratings"];
      var Locations = sessionData["Locations"];
      var priceRange = sessionData["price_range"];
      var priceMin = sessionData["price_data"].min;
      var priceMax = sessionData["price_data"].max;
      var roomSize = sessionData["Room Sizes"];
      var numberOfBeds= sessionData["numberOfBeds"];
      var tag_list = JSON.parse(sessionData["tags"]);

      if(!this.isLocationsFiltered(Locations) && !this.isPriceRangeFiltered(priceRange)&&!this.isNumberOfBedsFiltered(numberOfBeds)&&!this.isRoomSizeFiltered(roomSize)&&!this.isRatingsFiltered(Ratings)&&!this.isTagsFiltered(tag_list)){
          this.firestore.collection("rooms").snapshotChanges().subscribe(data=>{
            for(var room in data){
              that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
            }
        })
      }else if(this.isLocationsFiltered(Locations) && !this.isPriceRangeFiltered(priceRange)&&!this.isNumberOfBedsFiltered(numberOfBeds)&&!this.isRoomSizeFiltered(roomSize)&&!this.isRatingsFiltered(Ratings)&&!this.isTagsFiltered(tag_list)){
        this.firestore.collection("hotels",ref=>ref.where('City','==',Locations)).snapshotChanges().subscribe(data=>{
          for(var room in data){
            var id = data[room].payload.doc.id;
            that.firestore.collection("rooms",ref=>ref.where('hotel_id','==',id)).snapshotChanges().subscribe(data=>{
              for(var room in data){
                that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
              }
          })
          }
      })
      }else if(!this.isLocationsFiltered(Locations) && this.isPriceRangeFiltered(priceRange)&&!this.isNumberOfBedsFiltered(numberOfBeds)&&!this.isRoomSizeFiltered(roomSize)&&!this.isRatingsFiltered(Ratings)&&!this.isTagsFiltered(tag_list)){

            that.firestore.collection("rooms",ref=>ref.where('cost','>=',priceMin).where('cost','<=',priceMax)).snapshotChanges().subscribe(data=>{
              for(var room in data){
                that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
              }
          }) 
      }else if(!this.isLocationsFiltered(Locations) && !this.isPriceRangeFiltered(priceRange)&&this.isNumberOfBedsFiltered(numberOfBeds)&&!this.isRoomSizeFiltered(roomSize)&&!this.isRatingsFiltered(Ratings)&&!this.isTagsFiltered(tag_list)){

        that.firestore.collection("rooms",ref=>ref.where('beds','==',numberOfBeds)).snapshotChanges().subscribe(data=>{
          for(var room in data){
            that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
          }
        }) 
      }
      else if(!this.isLocationsFiltered(Locations) && !this.isPriceRangeFiltered(priceRange)&&!this.isNumberOfBedsFiltered(numberOfBeds)&&this.isRoomSizeFiltered(roomSize)&&!this.isRatingsFiltered(Ratings)&&!this.isTagsFiltered(tag_list)){

        that.firestore.collection("rooms",ref=>ref.where('size','==',roomSize)).snapshotChanges().subscribe(data=>{
          for(var room in data){
            that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
              }
          }) 
      }
      else if(!this.isLocationsFiltered(Locations) && this.isPriceRangeFiltered(priceRange)&&!this.isNumberOfBedsFiltered(numberOfBeds)&&!this.isRoomSizeFiltered(roomSize)&&this.isRatingsFiltered(Ratings)&&!this.isTagsFiltered(tag_list)){

        that.firestore.collection("rooms",ref=>ref.where('ratings','==',Ratings)).snapshotChanges().subscribe(data=>{
          for(var room in data){
            that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
          }
          }) 
      }
      else if(!this.isLocationsFiltered(Locations) && this.isPriceRangeFiltered(priceRange)&&!this.isNumberOfBedsFiltered(numberOfBeds)&&!this.isRoomSizeFiltered(roomSize)&&!this.isRatingsFiltered(Ratings)&&this.isTagsFiltered(tag_list)){

        that.firestore.collection("rooms",ref=>ref.where('cost','>=',priceMin)).snapshotChanges().subscribe(data=>{
          for(var room in data){
            that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
              }
          }) 
      }
      else{
        this.firestore.collection("rooms").snapshotChanges().subscribe(data=>{
          for(var room in data){
            that.rooms[data[room].payload.doc.id] = data[room].payload.doc.data();
          }
      })
      }

    return this.rooms;
    }
  }

  isRatingsFiltered(Ratings){
    var result = true;
    if(Ratings==="All Ratings"){
      result = false
    }
    return result;
  }

  isLocationsFiltered(Locations){
    var result = true;
    if(Locations==="All Locations"){
      result = false
    }
    return result;
  }

  isPriceRangeFiltered(PriceRange){
    var result = true;
    if(PriceRange==="All Price Ranges"){
      result = false
    }
    return result;
  }

  isRoomSizeFiltered(RoomSize){
    var result = true;
    if(RoomSize==="All Room Sizes"){
      result = false
    }
    return result;
  }

  isNumberOfBedsFiltered(numberOfBeds){
    var result = true;
    if(numberOfBeds==="All Bed Sizes"){
      result = false
    }
    return result;
  }

  isTagsFiltered(Tags){
    var result = true;
    for(var tag in Tags){
      if(Tags[tag]=="All"){
        result = false;
      }
    }
    return result;
  }

  getTagIds(tag_list){
    var tagData = this.getAllTags();
    var tagIDs = [];
    for(var tag in tagData.keys()){
      tagIDs.push("test");
      for(var value in tag_list){
        if(value == tagData[tag]){
          tagIDs.push(tag);
        }
      }
    }
  }
}
