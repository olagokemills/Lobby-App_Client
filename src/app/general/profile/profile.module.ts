import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MyPostsComponent } from './posts/my-posts.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ClipboardModule
  ],
  declarations: [ProfilePage, BookmarksComponent, MyPostsComponent]
})
export class ProfilePageModule {}
