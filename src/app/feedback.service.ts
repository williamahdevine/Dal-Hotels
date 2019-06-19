import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Feedback } from '../app/models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbackUrl:string = '../../assets/data/reviews.json';

  constructor(private http:HttpClient) { }

  getFeedback():Observable<Feedback[]> {
      return this.http.get<Feedback[]>(this.feedbackUrl);
  }
}
