import { Component, OnInit } from '@angular/core';

import { SignUpService } from '../models/sign-up.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  model = new SignUpService('', '', '', '', '');

  submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {
      this.model = new SignUpService('', '', '', '', '');
  }
}
