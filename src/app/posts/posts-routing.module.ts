import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsPage } from './news-list/news.component';

import { PostsPage } from './posts.page';

const PostRoutes: Routes = [
  {
    path: 'posts',
    component: PostsPage,
    children: [
      {
        path: 'news',
        component: NewsPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PostRoutes)],
  exports: [RouterModule],
})
export class PostsPageRoutingModule {}
