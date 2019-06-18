import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AvailableRoomComponent } from './available-room/available-room.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'avaliable', component: AvailableRoomComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
