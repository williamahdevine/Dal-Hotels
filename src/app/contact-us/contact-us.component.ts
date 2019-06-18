import { Component, OnInit } from '@angular/core';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  //Contact US form validation code referred from https://jasonwatmore.com/post/2018/11/07/ 
  validateForm: FormGroup;
  submitted = false;
  router: any;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      yourName: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // set getter for accessing the form fields
  get func() { return this.validateForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop  if the form is not valid.
    if (this.validateForm.invalid) {
      return;
    }

    alert('Your Message has been sent succesfully !!');

    //return to Home page
    location.href = '/home';

  }
}
