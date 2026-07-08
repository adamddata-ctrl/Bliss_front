import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuManageComponent } from './components/menu-manage/menu-manage.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard'; 
import { AnalyticsComponent } from './components/analytics/analytics.component'; // 1. Add this import line

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: MenuManageComponent, canActivate: [authGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authGuard] }, // 2. Add this route mapping here
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }