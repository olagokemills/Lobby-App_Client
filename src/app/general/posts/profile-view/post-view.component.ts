import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/api/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import * as moment from 'moment';
import { ErrorModel } from 'src/app/core/models/error.model';


@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['../posts.component.scss'],
})
export class PostViewComponent implements OnInit {

  postId:string;
  PostItem: any;
  message:string = '';
  userDeets:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private AppService: AuthService,
    public utility: SharedService
  ) {
    this.postId = this.activatedRoute.snapshot.params.id
    this.userDeets = JSON.parse(sessionStorage.getItem('userdetails'))
  }

  ngOnInit() {
    this.fetchSinglePost(this.postId)
  }

  fetchSinglePost(id:string)
  {
    this.AppService.fetchSinglePost(id, 'Post').subscribe(
      res=>{
        this.PostItem = res
      },
      (err: ErrorModel) => {
        this.utility.presentToast('top', err.friendlyMessage);
      }
    )
  }

  PostComment()
  {
    if(!this.utility.isLoggedIn())
  {
    return this.utility.presentToast('bottom','Please login to post a comment')
  }else{
    if(this.message.length <5)
    return this.utility.presentToast('top', 'Comment is too short')
    const body = {
      message: this.message,
      postId: this.postId,
      created_by: this.userDeets?.user?.id
    }
    this.AppService.postData(body,'Comment').
    subscribe(
      res=>{
        this.message = '';
        this.utility.presentToast('top', 'Comment addedd successfully');
        this.fetchSinglePost(this.postId)
      },(err: ErrorModel) => {
        this.utility.presentToast('top', err.friendlyMessage);
      }
    )
  }
}
LikePost(data:string, action:boolean)
{
  if(!this.utility.isLoggedIn())
  {
    return this.utility.presentToast('bottom','Please login to give feedback')
  }else{
    const body = {
      commentId: data,
      created_by: this.userDeets?.user?.id,
      likeType: action
    }
    this.AppService.postData(body,'Like/CreateLike').
    subscribe(
      res=>{
        this.utility.presentToast('top', 'Thanks for your feedback!');
        this.fetchSinglePost(this.postId)
      },(err: ErrorModel) => {
        this.utility.presentToast('top', err.friendlyMessage);
      }
    )
  }
}

}
