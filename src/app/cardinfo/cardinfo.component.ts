import { Component, OnInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
// import { Products } from "../_models/Product";

import { AlertService, AuthenticationService, UserService } from "../_services";



interface pddetails{
  image:string,
  name:string,
  price:string,
  reviews:string
}
@Component({ templateUrl: "cardinfo.component.html" })
export class CardinfoComponent implements OnInit {
  popularProducts: any[];
  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router,) {

  }
  productId: string;
  productdtails: pddetails;
  cartItems = [];

  ngOnInit() {
    this.productId = this.route.snapshot.params.id;
    if (this.productId) {
      this.userService.getProductByID(this.productId)
        .pipe(first())
        .subscribe(
          (response:any) => {
            const data= response.data;
            this.productdtails = data;
            console.log(data)
          },
          error => {
            console.log(error)
          });

    }
  }

  addToCart(e, product) {
    e.preventDefault();
    const CartItems = [...this.cartItems];
    const index = CartItems.findIndex((i) => i._id === product._id);
    console.log(index);
    if (index !== -1) {
      CartItems[index] = {
        ...CartItems[index],
        qty: parseInt(CartItems[index]["qty"]) + 1,
      };
    } else {
      CartItems.push({ ...product, qty: 1 });
    }
    this.cartItems = CartItems;
    alert("Item added to Cart")
    setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(CartItems));
    });
  }
}
