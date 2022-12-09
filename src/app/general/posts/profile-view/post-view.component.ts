import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/api/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';
import * as moment from 'moment';


@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['../posts.component.scss'],
})
export class PostViewComponent implements OnInit {

  postId:string;
  PostItem: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private AppService: AuthService,
    public utility: SharedService
  ) {
    this.postId = this.activatedRoute.snapshot.params.id
  }

  ngOnInit() {
    this.fetchSinglePost(this.postId)
   
    console.log(moment("2022-12-04T12:17:02.159607Z", "YYYYMMDD").fromNow());
  }

  fetchSinglePost(id:string)
  {
    this.AppService.fetchSinglePost(id, 'Post').subscribe(
      res=>{
        this.PostItem = res
        console.log(this.PostItem)
      }
    )
  }
}
