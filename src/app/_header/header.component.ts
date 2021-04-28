import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({ selector: 'cartCount', templateUrl: 'header.component.html' })
export class HeaderComponent implements OnInit {
   
    total=[];
  test=12;

  ngOnInit() {
    setInterval(()=>{
      this.countItems();
    },500)
  }

  countItems(){
    const items= localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[];
    this.total= items.reduce( ( sum , cur ) => sum + parseInt(cur.qty) , 0)
    console.log(typeof this.total,65656565)
  }
}