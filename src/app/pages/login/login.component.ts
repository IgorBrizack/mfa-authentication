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
  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  email: string = '';
  password: string = '';

  ngOnInit(): void {}

  doLogin(email: string, password: string) {
    console.log(email, password);
    const response = this.userService.login(email, password).subscribe({
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
