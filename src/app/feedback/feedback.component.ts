import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';

import { Feedback } from '../models/Feedback';
import { FeedbackForm } from '../models/FeedbackForm';
import { Ratings } from '../models/Ratings';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbacks:Feedback[];
  ratings:Ratings[];

  model = new FeedbackForm('', '', '', '', '');

  // sorting:string = Feedback.rating;

  title:string;
  by:string;
  date:string;
  rating:string;
  comment:string;

  submitted = false;

  addReview(form) {
      this.submitted = true;

      this.title = form.value.title;
      this.by = form.value.by;
      this.date = form.value.date;
      this.rating = form.value.rating;
      this.comment = form.value.comment;

      this.feedbacks.push({
          title:this.title,
          by:this.by,
          rating:this.rating,
          date:this.date,
          comment:this.comment
      });

      form.reset();
      alert("Comment Added Below");
   }

   isAscendic = true;

  //  sortByRating() {
  //      this.isAscendic?this.ratingAscendic():this.ratingDescendic();
  //  }
  // //  ratingAscendic() {
  // //       this.isAscendic = false;
  // //       this.feedbacks.rating = this.feedbacks.sort((n1,n2) => {
  // //           if (n1 < n2) {
  // //               return 1;
  // //           }
  // //           if (n1 > n2) {
  // //               return -1;
  // //           }
  // //           return 0;
  // //       });
  // //  }
  // //  ratingDescendic() {
  // //       this.isAscendic = true;
  // //       this.feedbacks.rating = this.feedbacks.sort((n1,n2) => {
  // //           if (n1 > n2) {
  // //               return 1;
  // //           }
  // //           if (n1 < n2) {
  // //               return -1;
  // //           }
  // //           return 0;
  // //       });
  // //  }

  constructor(private feedbackService:FeedbackService) { }

  ngOnInit() {
      this.model = new FeedbackForm('', '', '', '', '');

      this.feedbackService.getFeedback().subscribe(feedbacks => {
          this.feedbacks = feedbacks;
      });

      this.ratings = [
          {rate: '1'},
    {rate: '2'},
    {rate: '3'},
    {rate: '4'},
    {rate: '5'}
      ]
  }
}
