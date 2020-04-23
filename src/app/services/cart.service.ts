import { Injectable } from '@angular/core';
import { ItemService } from './item.service';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.models';
import { Item } from '../models/item.models';

@Injectable({
  providedIn: 'root'
})

export class CartService {



  cart: Cart[] = [
    
  ];

  custom = 0;
  customEntries = []
  total = 0;
  round10 = (value, exp) => this.decimalAdjust('round', value, exp);
  
  constructor() { }

  getCart() {
    return this.cart;
  }


  getCartItemCount() {
    var temp = 0;
    this.cart.forEach(entry => {
      temp += entry.totalQuantity
    });

    return temp
  }
  
  getCustomEntries(){
    return this.customEntries
  }

  getCartTotal(){
    this.total = 0
    
    this.cart.forEach(entry => {
      
      this.total += entry.total
    });

    this.customEntries.forEach(entry => {
      this.total += entry.total
    });
    
    
    this.total = this.round10(this.total, -2)
    return this.total.toString()
  }

  addToItem(item, index){
    var exist = this.cart.some(entry => entry.item.id === item.id)
    if(exist){
      var i =(this.cart.findIndex(entry => entry.id === index))
      this.cart[i].totalQuantity++;
      this.cart[i].total += this.round10(this.cart[i].item.price * 1.16, -2)
    }
    else{
      var newEntry = 
          {
            id: index,
            item: item,
            totalQuantity: 1,
            subtotal: item.price,
            tax: 0.16,
            tips: 0,
            total: item.price * 1.16,
          };
          this.cart.push(newEntry)
    }
  } 

  decreaseToItem(item, index) {
    var exist = this.cart.some(entry => entry.item.id === item.id)
    if(exist){
      var i =(this.cart.findIndex(entry => entry.id === index))
      if (this.cart[i].totalQuantity > 0) {
        this.cart[i].totalQuantity--;
        this.cart[i].total -= this.cart[i].item.price * 1.16
      }
      
    }
  }

  clear(){
    this.cart.forEach(entry => {
      this.cart.pop()
    });
    this.cart = []
    this.custom = 0
    this.customEntries = []
  }

  addCustom(money : number) {
    var temp = {
      name : "Custom Entry",
      total : money
    }

    this.customEntries.push(temp)
    
  }

  decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  
}
