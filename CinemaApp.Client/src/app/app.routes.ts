import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { BookingComponent } from './features/booking/booking.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminComponent } from './features/admin/admin.component';
import { authGuard, guestGuard, adminGuard } from './core/guards/auth.guards';

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
  
  // Movie routes
  { 
    path: 'movies/:id', 
    component: MovieDetailsComponent
  },
  
  // Booking route
  { 
    path: 'booking/:id', 
    component: BookingComponent
  },
  
  // Profile route (protected)
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [authGuard]
  },
  
  // Admin route (admin only)
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  
  // Placeholder routes (will be implemented in later steps)
  { path: 'movies', component: HomeComponent }, // TODO: Create movies list component
  { path: 'showtimes', component: HomeComponent }, // TODO: Create showtimes component
  
  // Catch all - redirect to home
  { path: '**', redirectTo: '/home' }
];
