import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12">
      <div class="max-w-md w-full animate-slideUp">
        <!-- Logo & Title -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cinema-red to-pink-600 rounded-2xl mb-4">
            <i class="fas fa-user-plus text-white text-3xl"></i>
          </div>
          <h1 class="text-3xl font-display font-bold gradient-text mb-2">Create Account</h1>
          <p class="text-slate-400">Join us for an amazing cinema experience</p>
        </div>

        <!-- Register Form -->
        <div class="glass-card p-8">
          @if (errorMessage()) {
            <div class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div class="flex items-center space-x-3">
                <i class="fas fa-exclamation-circle text-red-400"></i>
                <p class="text-red-200 text-sm">{{ errorMessage() }}</p>
              </div>
            </div>
          }

          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <!-- Name Row -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  [(ngModel)]="formData().firstName"
                  required
                  class="glass-input"
                  placeholder="John"
                  [disabled]="isLoading()"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  [(ngModel)]="formData().lastName"
                  required
                  class="glass-input"
                  placeholder="Doe"
                  [disabled]="isLoading()"
                />
              </div>
            </div>

            <!-- Email Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2">
                <i class="fas fa-envelope mr-2 text-cinema-red"></i>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                [(ngModel)]="formData().email"
                required
                email
                class="glass-input"
                placeholder="your@email.com"
                [disabled]="isLoading()"
              />
            </div>

            <!-- Phone Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-slate-300 mb-2">
                <i class="fas fa-phone mr-2 text-cinema-red"></i>
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phoneNumber"
                [(ngModel)]="formData().phoneNumber"
                class="glass-input"
                placeholder="+1234567890"
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
                [(ngModel)]="formData().password"
                required
                minlength="6"
                class="glass-input"
                placeholder="••••••••"
                [disabled]="isLoading()"
              />
              <p class="text-xs text-slate-500 mt-2">Minimum 6 characters</p>
            </div>

            <!-- Terms & Conditions -->
            <div class="mb-6">
              <label class="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  [(ngModel)]="acceptedTerms"
                  required
                  class="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-cinema-red focus:ring-cinema-red focus:ring-offset-0"
                >
                <span class="text-sm text-slate-400">
                  I agree to the <a routerLink="/terms" class="text-cinema-red hover:text-cinema-red-light">Terms of Service</a> and <a routerLink="/privacy" class="text-cinema-red hover:text-cinema-red-light">Privacy Policy</a>
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn-neon w-full ripple"
              [disabled]="!registerForm.valid || !acceptedTerms || isLoading()"
            >
              @if (isLoading()) {
                <span class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              } @else {
                <span class="flex items-center justify-center">
                  <i class="fas fa-user-plus mr-2"></i>
                  Create Account
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
              <span class="px-4 bg-midnight-900/50 text-slate-400">Already have an account?</span>
            </div>
          </div>

          <!-- Login Link -->
          <div class="text-center">
            <a
              routerLink="/auth/login"
              class="text-cinema-red hover:text-cinema-red-light font-medium transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Sign in instead
            </a>
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
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  formData = signal<RegisterRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  acceptedTerms = false;
  isLoading = this.authService.isLoading;
  errorMessage = signal<string>('');

  onSubmit(): void {
    if (!this.acceptedTerms) {
      this.errorMessage.set('Please accept the terms and conditions');
      return;
    }

    this.errorMessage.set('');

    this.authService.register(this.formData()).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
      }
    });
  }
}
