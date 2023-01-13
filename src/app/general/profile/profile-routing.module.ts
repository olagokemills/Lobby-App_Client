import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { MyPostsComponent } from './posts/my-posts.component';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path:'',
    redirectTo:'my-posts',
    pathMatch:'full'
  },
  {
    path: 'my-posts',
    component: MyPostsComponent,
  },
  {
    path:'bookmarks',
    component:BookmarksComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
