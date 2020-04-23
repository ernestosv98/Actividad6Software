import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {

  @Input() entries;
  constructor(private modalController : ModalController) { }

  temp = []

  ngOnInit() {
    
    this.temp = this.entries
    console.log(this.temp)
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
