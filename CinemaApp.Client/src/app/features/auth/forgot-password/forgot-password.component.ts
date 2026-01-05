import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../../../core/services/toast.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-midnight-950 via-midnight-900 to-midnight-950">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-red rounded-full blur-3xl animate-pulse"></div>
          <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
        </div>
      </div>

      <!-- Form Container -->
      <div class="relative z-10 w-full max-w-md">
        <div class="glass-card p-8 rounded-2xl backdrop-blur-xl border border-white/10">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cinema-red to-purple-600 rounded-full mb-4">
              <i class="fas fa-key text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-display font-bold text-white mb-2">Forgot Password?</h1>
            <p class="text-slate-400">{{ step() === 1 ? 'Enter your email to receive a reset code' : 'Enter the code and your new password' }}</p>
          </div>

          @if (step() === 1) {
            <!-- Step 1: Email Form -->
            <form (ngSubmit)="sendResetCode()" class="space-y-6">
              <div>
                <label class="block text-slate-400 text-sm mb-2">Email Address</label>
                <div class="relative">
                  <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input 
                    type="email" 
                    [(ngModel)]="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    class="w-full pl-12 pr-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cinema-red/50 transition-all">
                </div>
              </div>

              <button 
                type="submit" 
                [disabled]="isLoading()"
                class="w-full btn-neon ripple py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                @if (isLoading()) {
                  <i class="fas fa-spinner fa-spin mr-2"></i>
                  Sending...
                } @else {
                  <i class="fas fa-paper-plane mr-2"></i>
                  Send Reset Code
                }
              </button>
            </form>
          } @else {
            <!-- Step 2: Reset Code & New Password Form -->
            <form (ngSubmit)="resetPassword()" class="space-y-6">
              <div>
                <label class="block text-slate-400 text-sm mb-2">Reset Code</label>
                <div class="relative">
                  <i class="fas fa-shield-alt absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input 
                    type="text" 
                    [(ngModel)]="resetCode"
                    name="resetCode"
                    required
                    placeholder="Enter 6-digit code"
                    maxlength="6"
                    class="w-full pl-12 pr-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cinema-red/50 transition-all">
                </div>
              </div>

              <div>
                <label class="block text-slate-400 text-sm mb-2">New Password</label>
                <div class="relative">
                  <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input 
                    type="password" 
                    [(ngModel)]="newPassword"
                    name="newPassword"
                    required
                    minlength="6"
                    placeholder="••••••••"
                    class="w-full pl-12 pr-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cinema-red/50 transition-all">
                </div>
              </div>

              <div>
                <label class="block text-slate-400 text-sm mb-2">Confirm Password</label>
                <div class="relative">
                  <i class="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                  <input 
                    type="password" 
                    [(ngModel)]="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="••••••••"
                    class="w-full pl-12 pr-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cinema-red/50 transition-all">
                </div>
              </div>

              <div class="flex gap-3">
                <button 
                  type="button"
                  (click)="step.set(1)"
                  class="flex-1 glass-card py-3 hover:bg-white/10 transition-all">
                  <i class="fas fa-arrow-left mr-2"></i>
                  Back
                </button>
                <button 
                  type="submit" 
                  [disabled]="isLoading()"
                  class="flex-1 btn-neon ripple py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  @if (isLoading()) {
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    Resetting...
                  } @else {
                    <i class="fas fa-check mr-2"></i>
                    Reset Password
                  }
                </button>
              </div>
            </form>
          }

          <!-- Back to Login -->
          <div class="mt-6 text-center">
            <a routerLink="/auth/login" class="text-sm text-slate-400 hover:text-cinema-red transition-colors">
              <i class="fas fa-arrow-left mr-2"></i>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  private http = inject(HttpClient);
  private router = inject(Router);
  private toastService = inject(ToastService);

  step = signal(1); // 1 = email, 2 = reset code + new password
  isLoading = signal(false);

  email = '';
  resetCode = '';
  newPassword = '';
  confirmPassword = '';

  sendResetCode() {
    if (!this.email) {
      this.toastService.error('Please enter your email');
      return;
    }

    this.isLoading.set(true);
    this.http.post<any>(`${environment.apiUrl}/Auth/forgot-password`, { email: this.email }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.toastService.success('Reset code sent to your email!');
          this.step.set(2);
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error sending reset code:', error);
        this.toastService.error(error.error?.message || 'Failed to send reset code');
      }
    });
  }

  resetPassword() {
    if (!this.resetCode || !this.newPassword || !this.confirmPassword) {
      this.toastService.error('Please fill in all fields');
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.toastService.error('Passwords do not match');
      return;
    }

    if (this.newPassword.length < 6) {
      this.toastService.error('Password must be at least 6 characters');
      return;
    }

    this.isLoading.set(true);
    const payload = {
      email: this.email,
      resetCode: this.resetCode,
      newPassword: this.newPassword
    };

    this.http.post<any>(`${environment.apiUrl}/Auth/reset-password`, payload).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.toastService.success('Password reset successfully! Please login with your new password.');
          this.router.navigate(['/auth/login']);
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error resetting password:', error);
        this.toastService.error(error.error?.message || 'Failed to reset password');
      }
    });
  }
}
