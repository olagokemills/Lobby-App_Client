import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/api/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { SharedService } from 'src/app/core/services/shared.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { PaginationService } from 'src/app/core/classes/pagination.class';
import { ErrorModel } from 'src/app/core/models/error.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
    Items = [];
    userDeets:any;
  constructor(
    private AppService: AuthService,
    private clipboard: Clipboard,
    private utility: SharedService,
    private paged: PaginationService
  ) { 
    this.initiateUser()
  }

  ngOnInit() {

  }

  runFetch()
  {
    let userId = this.userDeets.user.id
    this.AppService.fetchSinglePost(userId, 'Post/GetUserPosts')
    .subscribe(
      //declare dt type here
      (res:any)=>{
        this.utility.isLoading = false;
        this.Items = res.posts
       // this.Items.push(...res.posts);
      }
    )
  }
  copyToClip(data:string)
  {
    let toCopy = `https://lobby.com/posts/${data}`;
    this.clipboard.copy(toCopy);
    this.utility.presentToast('bottom','Link copied for sharing');
  }
  
  initiateUser()
  {
    this.utility.isLoading = true
    if(this.utility.isLoggedIn()){
      this.userDeets = JSON.parse(sessionStorage.getItem('userdetails'))
      setTimeout(() => {
         this.runFetch()
      }, 1200);
    }
    else{
      this.utility.presentToast('top','You need to be signed in!')
      setTimeout(() => {
        this.utility.router.navigate(['/login'])
      }, 1200);
    }
  }


}
