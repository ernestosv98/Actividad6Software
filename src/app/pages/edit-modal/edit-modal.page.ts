import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/models/item.models';
import { ItemService } from 'src/app/services/item.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.page.html',
  styleUrls: ['./edit-modal.page.scss'],
})


export class EditModalPage implements OnInit {
  @Input() item
  constructor(private itemService : ItemService,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  edit(name : any, price : any, status : any, hidden : any){
    this.item.name = name.value
    this.item.price = price.value
    this.item.status = status.checked
    this.item.hidden = hidden.checked
    this.itemService.updateItem(this.item)
    this.dismiss()
  }

  checkedAvailable(){
    this.item.status = !this.item.status;
  }

  checkedHidden(){
    this.item.hidden = !this.item.hidden;
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
