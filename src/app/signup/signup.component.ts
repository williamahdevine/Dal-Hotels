import { Component, OnInit } from '@angular/core';

import { SignUp } from '../sign-up';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

    model = new SignUp('', '', '', '', '');

    submitted = false;

    onSubmit() { this.submitted = true; }

    ngOnInit() {
        this.model = new SignUp('', '', '', '', '');
    }
}
