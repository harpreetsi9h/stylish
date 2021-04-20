import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { User } from "../_models";
import { UserService, AlertService, AuthenticationService } from "../_services";

@Component({
  templateUrl: "product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {


  currentUserSubscription: Subscription;
  loading = false;
  products: any[];

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

    // redirect to home if already logged in
    if (!this.authenticationService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {
    this.getProducts()

  }
  getProducts() {
    this.userService.getProduct({})
      .pipe(first())
      .subscribe(
        (response: any) => {
          const data = response.data;
          if (data.length > 0) {
            this.products = data;
          }
          console.log(data)
        },
        error => {
          this.products = [];
        });
  }

  deleteItem(e, productId) {
    e.preventDefault();
    this.userService
      .deleteProduct(productId)
      .pipe(first())
      .subscribe((response: any) => {
        const { data, message } = response;
        alert(message);
        this.getProducts()
      });
  }

}
