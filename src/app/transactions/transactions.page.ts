import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { ModalController } from '@ionic/angular';
import { InfoModalPageModule } from '../pages/info-modal/info-modal.module';
import { InfoModalPage } from '../pages/info-modal/info-modal.page';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  constructor(private transactionService : TransactionService,
              private modalCrtl : ModalController) { }

  transactions = []
  ngOnInit() {
    this.getTransactions()
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe((transactions) => {
      this.transactions = transactions
      
    });
  }

  async openInfo(entry) {
    const modal = await this.modalCrtl.create({
      component: InfoModalPage,
      componentProps: {
        entries : entry
      }
    });
    await modal.present()
  }

}
