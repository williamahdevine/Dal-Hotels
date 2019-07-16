import { Component, OnInit } from "@angular/core";
import { SignUpService } from "../models/sign-up.service";
import { FirebaseService } from "./../services/firebase.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(public firbase: FirebaseService, private router: Router) {}

  model = new SignUpService("", "", "", "", "");

  submitted = false;

  onSubmit(value) {
    this.submitted = true;
    console.log("Form Data", value);
    this.firbase.createUser(value).then(res => {
      //this.resetFields();
      alert("New user created");
      this.router.navigate(["/"]);
    });
  }

  ngOnInit() {
    this.model = new SignUpService("", "", "", "", "");
  }
}
