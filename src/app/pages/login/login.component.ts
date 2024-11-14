import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  doLogin(email: string, password: string) {
    this.userService.login(email, password).subscribe({
      next: (data: any) => {
        if (data && data.token) {
          localStorage.setItem('core_token', data.token as any);
        }

        this.router.navigate(['/authentication']);
      },
      error: (err) => {
        this.toastService.showError(err.error.error);
      },
    });
  }
}
