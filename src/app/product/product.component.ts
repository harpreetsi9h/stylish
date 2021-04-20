import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { User } from "../_models";
import { UserService, AlertService, AuthenticationService } from "../_services";

@Component({
  templateUrl: "product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {


  currentUserSubscription: Subscription;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  productId: string;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {

    // redirect to home if already logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.productId = this.route.snapshot.params.id;
    if (this.productId) {
      this.userService.getProductByID(this.productId)
        .pipe(first())
        .subscribe(
          (response:any) => {
            const data= response.data;
            this.loginForm.patchValue(data)
            console.log(data)
          },
          error => {
            console.log(error)
          });

    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }


    this.loading = true;
    const data = {
      name: this.f.name.value,
      price: this.f.price.value,
      category: this.f.category.value,
      image: this.f.image.value,
      productId: this.productId
    }
    if (data.productId) {
      this.userService.editProduct(data)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false
            alert("Product Updated")
            this.router.navigateByUrl('/product-list');
          },
          error => {
            this.loading = false
            alert("Try after sometime")
          });
    }
    else {
      this.userService.addProduct(data)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false
            alert("Product added")
            this.router.navigateByUrl('/product-list');
          },
          error => {
            this.loading = false
            alert("Try after sometime")
          });
    }

    
  }

}
