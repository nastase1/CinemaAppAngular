import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { authGuard, guestGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  
  // Auth routes (only accessible when not logged in)
  { 
    path: 'auth/login', 
    component: LoginComponent,
    canActivate: [guestGuard]
  },
  { 
    path: 'auth/register', 
    component: RegisterComponent,
    canActivate: [guestGuard]
  },
];
