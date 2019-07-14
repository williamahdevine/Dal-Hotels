import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AvailableRoomComponent } from './available-room/available-room.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { BookingRecordsComponent } from './booking-records/booking-records.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// The web app's Firebase configuration
var firebaseconfig = {
  apiKey: "AIzaSyBVRqrOfXYv32ItWnY3kowdR8ZKq18Lpso",
  authDomain: "cs5709-ec495.firebaseapp.com",
  databaseURL: "https://cs5709-ec495.firebaseio.com",
  projectId: "cs5709-ec495",
  storageBucket: "cs5709-ec495.appspot.com",
  messagingSenderId: "881359994536",
  appId: "1:881359994536:web:d50b877bea1e0881"
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    AvailableRoomComponent,
    ProfileComponent,
    BookingsComponent,
    FeedbackComponent,
    ContactUsComponent,
    HomeComponent,
    ConfirmEqualValidatorDirective,
    SearchFilterComponent,
    HotelDetailsComponent,
    BookingRecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    // The Main Angularfire module 
    AngularFireModule.initializeApp(firebaseconfig),
    // Firebase database module 
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    // Needed for the database features
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
