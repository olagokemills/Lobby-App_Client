import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: [],
})
export class PostModalComponent implements OnInit {

    constructor(private modalCtrl: ModalController){}

    ngOnInit(): void {
        
    }


    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
      }
    
      confirm() {
        return this.modalCtrl.dismiss('confirm');
      }
}