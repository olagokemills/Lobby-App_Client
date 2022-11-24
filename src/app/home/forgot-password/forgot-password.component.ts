import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/api/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  ResetForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private utility: SharedService,
    private dataService: AuthService
  ) {}

  ngOnInit() {
    this.ResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ResetPassword(data: string) {
    this.utility.showLoading();
    this.dataService
      .postData(data, 'user/SendResetPasswordMail')
      .subscribe((res) => {});
  }
}
