import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass bg-midnight-900/80 border-b border-white/10">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center space-x-3 group">
            <div class="w-10 h-10 bg-gradient-to-br from-cinema-red to-pink-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
              <i class="fas fa-film text-white text-xl"></i>
            </div>
            <span class="text-2xl font-display font-bold gradient-text">CinemaApp</span>
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/home" routerLinkActive="text-cinema-red" 
               class="text-slate-300 hover:text-cinema-red transition-colors duration-300 font-medium">
              Home
            </a>
            <a routerLink="/movies" routerLinkActive="text-cinema-red"
               class="text-slate-300 hover:text-cinema-red transition-colors duration-300 font-medium">
              Movies
            </a>
            <a routerLink="/showtimes" routerLinkActive="text-cinema-red"
               class="text-slate-300 hover:text-cinema-red transition-colors duration-300 font-medium">
              Showtimes
            </a>
          </div>

          <!-- User Actions -->
          <div class="flex items-center space-x-4">
            @if (isLoggedIn()) {
              <div class="hidden md:flex items-center space-x-4">
                <a routerLink="/profile" class="text-slate-300 hover:text-cinema-red transition-colors">
                  <i class="fas fa-user text-xl"></i>
                </a>
                <button (click)="logout()" class="btn-neon ripple py-2 px-6 text-sm">
                  Logout
                </button>
              </div>
            } @else {
              <div class="hidden md:flex items-center space-x-4">
                <a routerLink="/auth/login" class="text-slate-300 hover:text-cinema-red transition-colors font-medium">
                  Login
                </a>
                <a routerLink="/auth/register" class="btn-neon ripple py-2 px-6 text-sm">
                  Sign Up
                </a>
              </div>
            }

            <!-- Mobile Menu Button -->
            <button (click)="toggleMenu()" class="md:hidden text-slate-300 hover:text-cinema-red">
              <i class="fas" [class.fa-bars]="!mobileMenuOpen()" [class.fa-times]="mobileMenuOpen()" class="text-2xl"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden mt-6 pb-4 space-y-4 animate-slide-down">
            <a routerLink="/home" (click)="toggleMenu()" 
               class="block text-slate-300 hover:text-cinema-red transition-colors py-2">
              Home
            </a>
            <a routerLink="/movies" (click)="toggleMenu()"
               class="block text-slate-300 hover:text-cinema-red transition-colors py-2">
              Movies
            </a>
            <a routerLink="/showtimes" (click)="toggleMenu()"
               class="block text-slate-300 hover:text-cinema-red transition-colors py-2">
              Showtimes
            </a>
            @if (isLoggedIn()) {
              <a routerLink="/profile" (click)="toggleMenu()"
                 class="block text-slate-300 hover:text-cinema-red transition-colors py-2">
                Profile
              </a>
              <button (click)="logout(); toggleMenu()" 
                      class="w-full btn-neon ripple py-3 mt-4">
                Logout
              </button>
            } @else {
              <a routerLink="/auth/login" (click)="toggleMenu()"
                 class="block text-slate-300 hover:text-cinema-red transition-colors py-2">
                Login
              </a>
              <a routerLink="/auth/register" (click)="toggleMenu()"
                 class="block btn-neon ripple py-3 mt-4 text-center">
                Sign Up
              </a>
            }
          </div>
        }
      </div>
    </nav>
  `,
  styles: [`
    nav {
      animation: slideDown 0.5s ease-out;
    }
  `]
})
export class NavbarComponent {
  mobileMenuOpen = signal(false);
  isLoggedIn = signal(false); // Will be connected to AuthService later

  toggleMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  logout() {
    // Will implement with AuthService
    this.isLoggedIn.set(false);
    console.log('Logout clicked');
  }
}
