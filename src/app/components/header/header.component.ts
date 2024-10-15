import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }

  // Verifica se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Método de logout, se necessário
  logout() {
    this.authService.logout();
  }
}
