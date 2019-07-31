import { Component, OnInit } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../models/feedback.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  // Contact US form validation code referred from https://jasonwatmore.com/post/2018/11/07/
  public validateForm: FormGroup;
  public submitted = false;
  public router: any;
  constructor(private formBuilder: FormBuilder,private feedback : FeedbackService) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      yourName: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['- Please Select -', Validators.required],
    });
  }

  // set getter for accessing the form fields
  get func() { return this.validateForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.validateForm.value);
    // stop  if the form is not valid.
    if (this.validateForm.invalid) {
      return;
    }
    this.feedback.sendContactUs(this.validateForm.value).then(data =>{
      alert('Your Message has been sent succesfully !!');

      // return to Home page
      location.href = '/';
    }).catch(err =>{
      alert("Error Sending Message")
    })


  }
}
