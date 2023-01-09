import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/core/api/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
})
export class PostModalComponent implements OnInit {
    PostForm: FormGroup;
    userDeets: any;

    constructor(
        private modalCtrl: ModalController,
        private fb: FormBuilder,
        private AppService: AuthService,
        public utility: SharedService){
            this.userDeets = JSON.parse(sessionStorage.getItem('userdetails'))
        }

    ngOnInit(): void {
        this.PostForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(250)]],
        });
    }


    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
      }
    
      confirm() {
        return this.modalCtrl.dismiss('confirm');
      }

    SubmitPost(data:FormGroup)
    {
    this.utility.showLoading()
     const body = {
        ...data,
        created_by:this.userDeets?.user?.id
      }
      this.AppService.postData(body, 'Post/CreatePost').subscribe(
        res=>{
            this.utility.dismissLoading()
            this.utility.presentToast('bottom','Post created successfully')
            setTimeout(() => {
              this.PostForm.reset()
              this.utility.router.navigate(['/general/post'])
            }, 1500);
            
        },
        err=>{
            this.utility.dismissLoading()
            this.utility.presentToast('bottom', err.message)
        }
      )
    }
}