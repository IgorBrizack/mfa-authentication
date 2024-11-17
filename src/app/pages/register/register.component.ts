import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() name: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  register() {
    this.userService.register(this.email, this.password, this.name).subscribe({
      next: (data: any) => {
        this.toastService.showSuccess('User registered successfully');
      },
      error: (err) => {
        console.log(err);
        this.toastService.showError(err.error.error);
      },
    });
  }
}
