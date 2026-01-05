import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { BookingComponent } from './features/booking/booking.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminComponent } from './features/admin/admin.component';
import { MoviesComponent } from './features/movies/movies.component';
import { ShowtimesComponent } from './features/showtimes/showtimes.component';
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
  { 
    path: 'auth/forgot-password', 
    component: ForgotPasswordComponent,
    canActivate: [guestGuard]
  },
  
  // Movie routes
  { 
    path: 'movies/:id', 
    component: MovieDetailsComponent
  },
  { 
    path: 'movies', 
    component: MoviesComponent
  },
  
  // Showtimes route
  { 
    path: 'showtimes', 
    component: ShowtimesComponent
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
  
  // Catch all - redirect to home
  { path: '**', redirectTo: '/home' }
];
