import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    public router: Router
  ) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 3000,
      spinner: 'circles',
    });
    loading.present();
  }

  async dismissLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 0,
      spinner: 'circles',
    });
    loading.dismiss();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });
    await toast.present();
  }
}
