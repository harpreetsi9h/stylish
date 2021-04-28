import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
// import { Products } from "../_models/Product";

import { AlertService, AuthenticationService, UserService } from "../_services";

@Component({ templateUrl: "men.component.html" })
export class MenComponent implements OnInit {
  popularProducts: any[];
  constructor(private userService: UserService) {

  }
  cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.userService
      .getProduct({ category: 'men' }) 
      .pipe(first())
      .subscribe((data: any) => {
        console.log(data)
        const Products = data.data
        if (Products.length > 0) {
          this.popularProducts = Products;
        }

      });
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
