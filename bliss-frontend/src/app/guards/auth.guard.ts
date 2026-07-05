import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Check if our Spring Boot key exists inside browser local memory
  if (localStorage.getItem('auth_token')) {
    return true; // 🔓 Access Granted! Let them view the dashboard data
  } else {
    router.navigate(['/login']); // 🔒 Access Denied! Kick them back to the login card
    return false;
  }
};