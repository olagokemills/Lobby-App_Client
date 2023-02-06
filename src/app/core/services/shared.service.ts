import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Clipboard } from '@angular/cdk/clipboard';
import { LoadingController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {

  PageName:string = '';
  isLoading:boolean = false;
  constructor(
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    public router: Router,
    public clipBoard: Clipboard,
    public location: Location,
    public activatedRoute: ActivatedRoute
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
  copyToClip(data:string)
  {
    let toCopy = `https://lobby.com/posts/${data}`;
    this.clipBoard.copy(toCopy);
    this.presentToast('bottom','Link copied for sharing');
  }
  goBack()
  {
    this.location.back()
  }
  castDateDifference(data:any)
  {
    return (moment(data, "YYYYMMDD").fromNow());
  }
  cutString(data:string)
  {
    return (data.substring(0,75).concat('...'))
  }
  isLoggedIn()
  {
    const userDeets = sessionStorage.getItem('userdetails')
    if(userDeets)
    {
      return true
    }else{
      return false
    }
  }
  logOut(){
    sessionStorage.clear()
    this.presentToast('bottom','You are being logged out!')
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 900);
  }
  
}
