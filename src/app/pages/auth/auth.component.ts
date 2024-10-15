import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  errorMessage: string = '';
  private unsub = new Subject<void>();

  // Formulário de login com FormBuilder
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }


  onLogin() {
    const username = this.loginForm.controls.username.value!;
    const senha = this.loginForm.controls.password.value!;

    this.loginService
      .login({ email: username, senha })
      .pipe(takeUntil(this.unsub))
      .subscribe({
        next: (user) => {
          if (user) {
            this.authService.saveToken(user);
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Usuário ou senha incorretos.';
          }
        },
        error: () => {
          this.errorMessage = 'Problemas no servidor, tente mais tarde';
        },
      });
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }
}
