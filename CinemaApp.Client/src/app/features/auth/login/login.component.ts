import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { LoginRequest } from '../../../core/models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12">
      <div class="max-w-md w-full animate-slideUp">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cinema-red to-pink-600 rounded-2xl mb-4">
            <i class="fas fa-film text-white text-3xl"></i>
          </div>
          <h1 class="text-3xl font-display font-bold gradient-text mb-2">Welcome Back</h1>
          <p class="text-slate-400">Sign in to continue your cinema experience</p>
        </div>

        <!-- Login Form -->
        <div class="glass-card p-8">
          @if (errorMessage()) {
            <div class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div class="flex items-center space-x-3">
                <i class="fas fa-exclamation-circle text-red-400"></i>
                <p class="text-red-200 text-sm">{{ errorMessage() }}</p>
              </div>
            </div>
          }

          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <!-- Email Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2">
                <i class="fas fa-envelope mr-2 text-cinema-red"></i>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                [(ngModel)]="credentials().email"
                required
                email
                class="glass-input"
                placeholder="your@email.com"
                [disabled]="isLoading()"
              />
            </div>

            <!-- Password Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2">
                <i class="fas fa-lock mr-2 text-cinema-red"></i>
                Password
              </label>
              <input
                type="password"
                name="password"
                [(ngModel)]="credentials().password"
                required
                minlength="6"
                class="glass-input"
                placeholder="••••••••"
                [disabled]="isLoading()"
              />
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mb-6">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" class="w-4 h-4 rounded border-white/10 bg-white/5 text-cinema-red focus:ring-cinema-red focus:ring-offset-0">
                <span class="text-sm text-slate-400">Remember me</span>
              </label>
              <a routerLink="/auth/forgot-password" class="text-sm text-cinema-red hover:text-cinema-red-light transition-colors">
                Forgot password?
              </a>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn-neon w-full ripple relative"
              [disabled]="!loginForm.valid || isLoading()"
            >
              @if (isLoading()) {
                <span class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              } @else {
                <span class="flex items-center justify-center">
                  <i class="fas fa-sign-in-alt mr-2"></i>
                  Sign In
                </span>
              }
            </button>
          </form>

          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-white/10"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-4 bg-midnight-900/50 text-slate-400">Don't have an account?</span>
            </div>
          </div>

          <!-- Register Link -->
          <div class="text-center">
            <a
              routerLink="/auth/register"
              class="text-cinema-red hover:text-cinema-red-light font-medium transition-colors"
            >
              Create new account
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>

        <!-- Test Credentials -->
        <div class="mt-6 glass-card p-4">
          <p class="text-xs text-slate-400 mb-2"><i class="fas fa-info-circle mr-2"></i>Test Accounts:</p>
          <div class="space-y-1 text-xs">
            <p class="text-slate-500">Admin: <span class="text-cinema-red">admin@cinema.com</span> / Admin@123</p>
            <p class="text-slate-500">User: <span class="text-cinema-red">john.doe@example.com</span> / Customer@123</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
  `]
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  credentials = signal<LoginRequest>({
    email: '',
    password: ''
  });

  isLoading = this.authService.isLoading;
  errorMessage = signal<string>('');

  onSubmit(): void {
    if (!this.credentials().email || !this.credentials().password) {
      this.toastService.warning('Please fill in all fields');
      return;
    }

    this.errorMessage.set('');

    this.authService.login(this.credentials()).subscribe({
      next: () => {
        this.toastService.success('Welcome back! Login successful.');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.toastService.error(error.message || 'Login failed. Please try again.');
      }
    });
  }
}
