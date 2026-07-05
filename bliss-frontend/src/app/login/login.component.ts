import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response: any) => { // Save the backend JWT token to browser local storage
        localStorage.setItem('auth_token', response.token || response.jwt); 
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        alert('Invalid server credentials or backend is offline!');
        console.error(err);
      }
    });
  }
}