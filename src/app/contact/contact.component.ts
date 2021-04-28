import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

// import { Products } from "../_models/Product";

import { AlertService, AuthenticationService, UserService } from "../_services";

@Component({ templateUrl: "contact.component.html" })
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;
  submitted = false;
  popularProducts: any[];
  constructor(private userService: UserService, private formBuilder: FormBuilder, private alertService: AlertService) {

  }
  cartItems = [];

  

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', Validators.required],
        phone: ['', Validators.required],
        gender: ['', Validators.required]
    });
}

// convenience getter for easy access to form fields
get f() { return this.contactForm.controls; }

onSubmit() {
    console.log("ckjsdfksjd");
    alert("Contact Form Submit successful")
    window.location.reload();
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
        return;
    }
    
    //alert("Contact Form Submit successful")
    //this.alertService.success('Contact Form Submit successful', true);
}
}
