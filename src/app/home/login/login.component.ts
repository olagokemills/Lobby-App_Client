import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/api/auth.service';
import { AuthModel } from 'src/app/core/models/auth.model';
import { SharedService } from 'src/app/core/services/shared.service';
import { TokenStorageService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utility: SharedService,
    private dataService: AuthService,
    private tokenStorage:TokenStorageService
  ) {}

  ngOnInit() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  Login(data: AuthModel) {
    this.utility.showLoading();
    this.dataService.postData(data, 'user/login').subscribe((res:any) => {
        sessionStorage.setItem('userdetails', JSON.stringify(res))
        this.tokenStorage.saveToken(res.accessToken);
        this.tokenStorage.saveRefreshToken(res.refreshToken);
        this.utility.router.navigate(['/general/post'])
    },
    err=>{
      this.utility.presentToast('top', err.message)
    });
  }
}
