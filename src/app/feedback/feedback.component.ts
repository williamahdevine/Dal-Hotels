import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';

import { Feedback } from '../models/Feedback';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
    feedbacks:Feedback[];

    constructor(private feedbackService:FeedbackService) { }

    ngOnInit() {
        this.feedbackService.getFeedback().subscribe(feedbacks => {
            this.feedbacks = feedbacks;
        });
    }
}
