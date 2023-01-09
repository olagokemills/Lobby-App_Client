import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/api/auth.service';
import { RegisterModel } from 'src/app/core/models/auth.model';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: AuthService,
    public Utility: SharedService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      userName: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  Register(data: RegisterModel) {
    this.Utility.showLoading();
    this.dataService.postData(data, 'user/register').subscribe((res) => {
      if (res) {
        this.Utility.presentToast('top', 'Registration Successful!');
        sessionStorage.setItem('userdetails', JSON.stringify(res))
        this.Utility.router.navigate(['/general/post'])
        setTimeout(() => {
          this.Utility.router.navigate(['/general']);
          //route to home
        }, 1500);
      }
    });
  }
}
