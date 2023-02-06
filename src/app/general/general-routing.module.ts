import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralPage } from './general.page';
import { PostViewComponent } from './posts/profile-view/post-view.component';
import { PostsComponent } from './posts/posts.component';
import { PostModalComponent } from './post-modal/post-modal.component';
import { ProfilePage } from './profile/profile.page';

const routes: Routes = [
      {
        path: '',
        component: PostsComponent,
      },
      {
        path:'add-post',
        component: PostModalComponent
      },
      {
        path: 'profile',
        component:ProfilePage,
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: ':id',
        component: PostViewComponent,
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
