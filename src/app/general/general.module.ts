import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralPageRoutingModule } from './general-routing.module';

import { GeneralPage } from './general.page';
import { PostsComponent } from './posts/posts.component';
import { CommentsComponent } from './comments/comments.component';
import { PostViewComponent } from './posts/profile-view/post-view.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { SortByPipe } from '../core/pipe/orderBy.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, GeneralPageRoutingModule,FormsModule, ReactiveFormsModule],
  declarations: [GeneralPage, PostsComponent, CommentsComponent, PostViewComponent, PostModalComponent, SortByPipe],
})
export class GeneralPageModule {}
