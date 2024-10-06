import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  // Função chamada no envio do formulário
  onLogin() {
    const isAuthenticated = this.authService.login(this.username, this.password);
    if (isAuthenticated) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Usuário ou senha incorretos.';
    }
  }
}

