import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/api/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { SharedService } from 'src/app/core/services/shared.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PaginationService } from 'src/app/core/classes/pagination.class';
import { ErrorModel } from 'src/app/core/models/error.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  PostList:any;
  Items = [];
  pager:any = {};
  activePage = 1;
  totalCount: any;
  currentPage: any = 1;
  userDeets:any;
  constructor(
    private AppService: AuthService,
    private clipboard: Clipboard,
    private utility: SharedService,
    private paged: PaginationService
  ) {
    this.utility.PageName = 'Posts'
    this.userDeets = JSON.parse(sessionStorage.getItem('userdetails'))
  }

  ngOnInit() {
    this.FetchPosts()
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.Items = []
     this.runFetch({ page:1, size:2})
    }, 2000);
  }

  FetchPosts()
  {
    let body = {
      page:this.currentPage,
      size:2
    }
    this.runFetch(body)
  }

  runFetch(data)
  {
    this.AppService.fetchPosts(data, 'Post/GetAllPosts')
    .subscribe(
      //declare dt type here
      (res:any)=>{
        //this.Items = res.posts
        this.Items.push(...res.posts);
        this.totalCount = res.totalPosts
        this.pager = this.paged.getPager(res.totalPosts, this.activePage) 
      }
    )
  }
  copyToClip(data:string)
  {
    let toCopy = `https://lobby.com/posts/${data}`;
    this.clipboard.copy(toCopy);
    this.utility.presentToast('bottom','Link copied for sharing');
  }
  onIonInfinite(ev) {
    //increment current page
    this.setPage(this.currentPage+1)
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  setPage(page:number)
  {
    this.activePage = page
    if(page < 1 || page > this.pager.totalPages)
    {
      return
    }
    this.pager = this.paged.getPager(this.totalCount, page)
    //update currentPage tracker
    this.currentPage= this.currentPage +1;
    //call data for new page
    this.runFetch({ page:this.currentPage, size:2})
  }

  addBookmark(data)
  {
    //add color to existing bookmarks
  if(!this.utility.isLoggedIn())
  {
    return this.utility.presentToast('bottom','Please login to save post!')
  }else{
   const body = {
    userId: this.userDeets.user.id,
    postId: data.id
    }
    this.AppService.postData(
      body, 'Post/CreateBookmark'
    ).subscribe(
      res=>{
        this.utility.presentToast('top', 'Added to bookmarks');
      },
      (err: ErrorModel) => {
        this.utility.presentToast('top', err.friendlyMessage);
      }
    )
  }
}
  
}
