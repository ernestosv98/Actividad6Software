import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction.models';
import { TransactionsPageModule } from '../transactions/transactions.module';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private afs: AngularFirestore) { }

  getTransactions() {
    return this.afs.collection('transaction').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const transaction = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id
        var temp = {
          id : id,
          entry : transaction.entry,
          date: transaction.date,
          total : transaction.total,
          custom : transaction.custom
        }
        return temp;
      }))
    );
  }

  addTransaction(transaction : any){
    return this.afs.collection('transaction').add(transaction);
  }


}
