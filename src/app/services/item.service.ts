import { Injectable } from '@angular/core';
import { Item } from '../models/item.models';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ItemService {

  constructor(private afs: AngularFirestore) { }

  getItems() {
    return this.afs.collection('items').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const item = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id
        var temp = {
          id: id,
          name: item.name,
          price: item.price,
          status: item.status,
          hidden: item.hidden
        }
        return temp;
      }))
    );
  }

  addItem(item: any)  {
    
    return this.afs.collection('items').add(item);
  }

  removeItem(id) {
    return this.afs.collection('items').doc(id).delete();
  }

  updateItem(item){
    return this.afs.collection('items').doc(item.id).update(item)
  }


}
