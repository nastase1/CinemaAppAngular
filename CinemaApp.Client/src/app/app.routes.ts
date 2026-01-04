import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookingComponent } from './features/booking/booking.component';
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
  
  // Booking route
  { 
    path: 'booking/:id', 
    component: BookingComponent
  },
  
  // Placeholder routes (will be implemented in later steps)
  { path: 'movies', component: HomeComponent }, // TODO: Create movies component
  { path: 'movies/:id', component: HomeComponent }, // TODO: Create movie details component
  { path: 'showtimes', component: HomeComponent }, // TODO: Create showtimes component
  { path: 'profile', component: HomeComponent }, // TODO: Create profile component
  
  // Catch all - redirect to home
  { path: '**', redirectTo: '/home' }
];
