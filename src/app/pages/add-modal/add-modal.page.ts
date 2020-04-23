import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.page.html',
  styleUrls: ['./add-modal.page.scss'],
})
export class AddModalPage implements OnInit {

  constructor(private itemService : ItemService,
              private modalController: ModalController) { }

  ngOnInit() {
  }

  name: string;
  price: number;
  status: boolean;
  hidden: boolean;


  add() {
    var temp = {
      id: "",
      name: this.name,
      price: this.price,
      status: ((this.status==undefined) ? false : true),
      hidden: ((this.hidden==undefined) ? false : true)
    }
    this.itemService.addItem(temp)
    this.dismiss()
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
