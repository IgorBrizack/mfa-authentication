import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) {
    // Criando o FormGroup com validação
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  // Método para o registro
  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password, name } = this.registerForm.value;

    this.userService.register(email, password, name).subscribe({
      next: (data: any) => {
        this.toastService.showSuccess('User registered successfully');
        this.router.navigate(['/login']); // Redireciona para a tela de login após o sucesso
      },
      error: (err) => {
        console.log(err);
        this.toastService.showError(err.error.error);
      },
    });
  }
}
