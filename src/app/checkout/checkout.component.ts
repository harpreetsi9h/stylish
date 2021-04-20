import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { User } from "../_models";
import { UserService, AlertService, AuthenticationService } from "../_services";

@Component({
  templateUrl: "checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  Items: any[];
  Ordertotal: any;
  TotalItems: any;

  checkoutForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService

  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
    const items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    if (items && items.length > 0) {
      this.Items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
      this.Ordertotal = this.Items.reduce((pre: number, cur: any) => { return pre + Number(cur.price * cur.qty) }, 0);
      this.TotalItems=items.length;
    } else {
      this.Ordertotal = 0;
      this.TotalItems=0;
    }

  }
  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      person: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      note: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.checkoutForm.controls; }

  submitOrder() {
    if (!this.currentUser || !this.currentUser._id) {
      alert("please login first")
      return
    }
    const data = {
      userId: this.currentUser._id,
      items: [...this.Items],
      total: this.Ordertotal,
      billing_address:{
        person: this.f.person.value,
        address: this.f.address.value,
        city: this.f.city.value,
        pincode: this.f.pincode.value,
        note: this.f.note.value
      }
    };
    console.log(data,6363636)
    this.userService
      .addOrder(data)
      .pipe(first())
      .subscribe((res: any) => {
        this.Items = [];
        localStorage.setItem("cart", '[]');
        alert(res.message);
        this.router.navigate(['/thankyou'])

      });
  }
}
