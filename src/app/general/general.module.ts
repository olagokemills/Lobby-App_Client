import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostViewComponent } from './posts/profile-view/post-view.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GeneralPageRoutingModule],
  declarations: [GeneralPage, PostsComponent, CommentsComponent, PostViewComponent],
})
export class GeneralPageModule {}
