import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ModalController } from '@ionic/angular';
import { EditModalPage } from '../pages/edit-modal/edit-modal.page';
import { observable } from 'rxjs';
import { Item } from '../models/item.models';
import { AddModalPage } from '../pages/add-modal/add-modal.page';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  hdn = true;
  unhdn = false;
  display = false;
  constructor(private itemService: ItemService,
              private modalctrl: ModalController) { }

  items = [];
  
  ngOnInit() {
    this.getItems()
  }

  getItems() {
    this.itemService.getItems().subscribe((items) => {
      this.items = items
    });
  }



  remove(id){
    this.itemService.removeItem(id)
  }

  async add() {
    const modal = await this.modalctrl.create({
      component: AddModalPage,
    });
    await modal.present()
  }

  async edit(item) {
    const modal = await this.modalctrl.create({
      component: EditModalPage,
      componentProps: {
        item: item
      }
    });
    await modal.present()
  }
  
  hidden(index) {
    this.items[index].hidden = !this.items[index].hidden
    this.itemService.updateItem(this.items[index])
  }
  unhidden(index) {
    this.items[index].hidden = !this.items[index].hidden
    this.itemService.updateItem(this.items[index])
  }
  updateDisplay() {
    this.display = !this.display;
  }
}
