import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IUserJwt } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  qrCodeGenerated: boolean = false;
  qrCode: string = '';
  loading: boolean = false;
  userData: IUserJwt = {} as IUserJwt;
  totpCode: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('core_token');

    this.userData = this.userService.decodeToken(token as string) as IUserJwt;

    if (this.userData.mfa_authentication.mfa_approved) {
      this.router.navigate(['/home']);
    } else if (!this.userData.mfa_authentication.mfa_registered) {
      this.registerUserMfa();
    }
  }

  registerUserMfa() {
    this.loading = true;
    this.userService.registerUserMfa(this.userData.token).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.qrCodeGenerated = true;
        this.qrCode = data.qrCode;
      },
      error: (err) => {
        this.qrCodeGenerated = false;
        this.loading = false;
        this.toastService.showError(err.error.error);
      },
    });
  }

  validate() {
    if (!this.userData.mfa_authentication.mfa_registered) {
      this.registerUserMfaValidation(this.totpCode);
    } else {
      this.userMfaAuthentication(this.totpCode);
    }
  }

  registerUserMfaValidation(totpCode: string) {
    this.loading = true;
    this.qrCodeGenerated = false;
    this.userService
      .registerUserMfaValidation(this.userData.token, totpCode)
      .subscribe({
        next: (data: any) => {
          if (data && data.token) {
            localStorage.setItem('core_token', data.token as any);
          }
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          this.toastService.showError(err.error.error);
        },
      });
  }

  userMfaAuthentication(totpCode: string) {
    this.loading = true;
    this.userService
      .userMfaAuthentication(this.userData.token, totpCode)
      .subscribe({
        next: (data: any) => {
          if (data && data.token) {
            localStorage.setItem('core_token', data.token as any);
          }
          this.loading = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loading = false;
          this.toastService.showError(err.error.error);
        },
      });
  }
}
