import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalPage } from '../pages/cart-modal/cart-modal.page';
import { ItemService } from '../services/item.service';
import { isNumber } from 'util';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cart = [];
  items = [];
  cartItemCount: number;
  carrito = true;
  numeros = false;
  total = '0';
  
  value = '0';
  numberGroups= [ [1,2,3],
             [4,5,6],
             [7,8,9],
             ['C',0, '+']
           ];

  oldValue = '0';
  lastOperator = 'x';
  readyForNewInput = true;


  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  constructor(private cartService: CartService,
              private modalCrtl: ModalController,
              private itemService : ItemService,
              ) { }

  ngOnInit() {
    this.getItems()
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.total = this.cartService.getCartTotal()
  }

  getItems() {
    this.itemService.getItems().subscribe((items) => {
      this.items = items
    });
  }

  addToCart(item, index) {
    this.cartService.addToItem(item, index)
    this.cartItemCount++;
    this.total = this.cartService.getCartTotal()
  }

  removeToCart(item, index) {
    this.cartService.decreaseToItem(item, index)
    this.total = this.cartService.getCartTotal()
    
    if(this.cartItemCount <= 0){
      this.cartItemCount = 0
    }
    else{
      this.cartItemCount--;
    }
  }

  numerosDisplay() {
    this.carrito = false;
    this.numeros = true;
  }

  carritoDisplay(){
    this.carrito = true;
    this.numeros = false;
  }

  onButtonPress(symbol, valor) {
    valor = Number(this.total);
    if (isNumber(symbol)) {
      if (this.readyForNewInput)
        this.value = '' + symbol;
      else 
        this.value += '' + symbol;
      this.readyForNewInput = false;
    }
    else if (symbol === 'C') {
      this.value =  '' ;
      this.readyForNewInput = true;
    }
    else if (symbol === '+') {
      valor = (+this.value);
      this.cartService.addCustom(Number(valor));
      this.value = '';
      
    }

    this.total = this.cartService.getCartTotal()

  }
  clearCart() {
    this.cartService.clear();
    this.total = this.cartService.getCartTotal()
    this.cartItemCount = 0
  }

  async openCarrito() {
    const modal = await this.modalCrtl.create({
      component: CartModalPage,
      componentProps: {
        
      }
    });
    await modal.present()
  }

}
