import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuManageComponent } from './components/menu-manage/menu-manage.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: MenuManageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Starts users at the login page
  { path: '**', redirectTo: '/login' }                    // Fallback redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }