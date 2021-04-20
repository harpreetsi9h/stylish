import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import {Router} from "@angular/router"


import { User } from "../_models";
import { UserService, AuthenticationService } from "../_services";

@Component({
  templateUrl: "cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent {
  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  Items: any[];
  Ordertotal:any;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      (user) => {
        this.currentUser = user;
      }
    );
    const items=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    if(items && items.length > 0){
      this.Items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[];
      this.Ordertotal = this.Items.reduce((pre:number, cur:any) => {return pre + Number(cur.price * cur.qty)}, 0);
    }else{
      this.Ordertotal=0;
    }
   
  }

  updateItem(e, index) {
    const Items = this.Items;
    e.preventDefault();
    Items[index] = { ...Items[index], qty: parseInt(e.target.value) };
    this.Items = Items;
    this.Ordertotal = this.Items.reduce((pre:number, cur:any) => {return pre + Number(cur.price * cur.qty)}, 0);

    localStorage.setItem("cart", JSON.stringify(this.Items));
  }

  deleteItem(e, id) {
    e.preventDefault();
    let Items = this.Items;
    Items = Items.filter((i) => i._id !== id);
    this.Items = Items;
    this.Ordertotal = this.Items.reduce((pre:number, cur:any) => {return pre + Number(cur.price * cur.qty)}, 0);

    localStorage.setItem("cart", JSON.stringify(this.Items));
  }

}
