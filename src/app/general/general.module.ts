import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { ProfileComponent } from './profile/profile.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GeneralPageRoutingModule],
  declarations: [GeneralPage, ProfileComponent, CommentsComponent],
})
export class GeneralPageModule {}
