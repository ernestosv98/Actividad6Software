import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Cart } from 'src/app/models/cart.models';
import { Transaction } from 'src/app/models/transaction.models';
import { DatePipe } from '@angular/common';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: Cart[] = [];
  customEntries = []
  total = "";
 
  constructor(private cartService: CartService, 
              private modalCtrl: ModalController, 
              private alertCtrl: AlertController,
              private datePipe: DatePipe,
              private transactionService : TransactionService) { }
 
  ngOnInit() {
    this.cart = this.cartService.getCart()
    this.customEntries = this.cartService.getCustomEntries()
    this.total = this.cartService.getCartTotal()
    
  }

  charge(){
    var temp: Transaction = 
    {
      id : " ",
      entry : this.cart,
      date : this.datePipe.transform(Date.now()),
      total : this.total,
      custom : this.cartService.getCustomEntries()
    }

    this.transactionService.addTransaction(temp);
    this.dismiss()
    this.cartService.clear()
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
 
  
}
