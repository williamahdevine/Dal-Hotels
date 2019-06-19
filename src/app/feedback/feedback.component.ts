import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';

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

    submitted = false;

    addReview() { this.submitted = true; }

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
