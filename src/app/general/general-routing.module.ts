import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPage } from './general.page';
import { PostViewComponent } from './posts/profile-view/post-view.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralPage,
    children: [
      {
        path: 'post',
        component: PostsComponent,
      },
      {
        path: 'post/:id',
        component: PostViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
