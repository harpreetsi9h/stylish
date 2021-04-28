import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
// import { Products } from "../_models/Product";

import { AlertService, AuthenticationService, UserService } from "../_services";

@Component({ templateUrl: "home2.component.html" })
export class Home2Component implements OnInit {
  products: any[];
  popularProducts: any[];
  newProducts: any[];
  recomendProducts: any[];
  constructor(private userService: UserService) {

  }
  cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[];

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.userService
      .getProduct({})
      .pipe(first())
      .subscribe((data: any) => {
        console.log(data)
        const Products = data.data
        if (Products.length > 0) {
          this.popularProducts = (Products.filter(p=>(p.price >= 500 && p.price <= 800 ))).slice(0, 4);
          this.newProducts = (Products.filter(p=>(p.price >= 300 && p.price <= 500 ))).slice(0, 4);
          this.recomendProducts = (Products.filter(p=>(p.price >= 50 && p.price <= 300 ))).slice(0, 4); 
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
