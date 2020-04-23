import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsPageRoutingModule } from './items-routing.module';
import { ItemsPage } from './items.page';
import { EditModalPage } from '../pages/edit-modal/edit-modal.page';
import { EditModalPageModule } from '../pages/edit-modal/edit-modal.module';
import { RouterModule } from '@angular/router';
import { AddModalPageModule } from '../pages/add-modal/add-modal.module';

@NgModule({
  entryComponents: [
    EditModalPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemsPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ItemsPage
      },
    ]),
    EditModalPageModule,
    AddModalPageModule
  ],
  declarations: [ItemsPage]
})
export class ItemsPageModule {}
