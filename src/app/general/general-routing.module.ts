import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPage } from './general.page';
import { PostViewComponent } from './posts/profile-view/post-view.component';
import { PostsComponent } from './posts/posts.component';
import { PostModalComponent } from './post-modal/post-modal.component';

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
      {
        path:'add-post',
        component: PostModalComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
