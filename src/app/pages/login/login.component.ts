import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: string = '';
  password: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('core_token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  doLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.userService.login(email, password).subscribe({
        next: (data: any) => {
          if (data && data.token) {
            localStorage.setItem('core_token', data.token as any);
          }

          this.router.navigate(['/authentication']);
        },
        error: (err) => {
          this.toastService.showError(err.error.error || 'Login failed');
        },
      });
    }
  }
}
