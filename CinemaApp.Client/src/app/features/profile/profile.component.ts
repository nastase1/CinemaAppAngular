import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Booking } from '../../core/models/booking.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-midnight-950 to-midnight-900 pt-24 pb-16">
      <div class="container mx-auto px-6 md:px-12">
        @if (authService.isAuthenticated()) {
          <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-8 animate-slide-up">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    My Profile
                  </h1>
                  <p class="text-slate-400 text-lg">Manage your account and bookings</p>
                </div>
                <a 
                  routerLink="/home" 
                  class="glass-card px-6 py-3 hover:bg-white/10 transition-all rounded-xl font-semibold group">
                  <i class="fas fa-arrow-left mr-2 group-hover:text-cinema-red transition-colors"></i>
                  Back to Home
                </a>
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-4 mb-8 overflow-x-auto pb-2 animate-slide-up" style="animation-delay: 0.1s">
              <button
                (click)="activeTab.set('bookings')"
                [class.bg-cinema-red]="activeTab() === 'bookings'"
                [class.bg-midnight-800]="activeTab() !== 'bookings'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-ticket-alt mr-2"></i>
                My Bookings
              </button>
              <button
                (click)="activeTab.set('profile')"
                [class.bg-cinema-red]="activeTab() === 'profile'"
                [class.bg-midnight-800]="activeTab() !== 'profile'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-user mr-2"></i>
                Profile Info
              </button>
              <button
                (click)="activeTab.set('settings')"
                [class.bg-cinema-red]="activeTab() === 'settings'"
                [class.bg-midnight-800]="activeTab() !== 'settings'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-cog mr-2"></i>
                Settings
              </button>
            </div>

            <!-- Content -->
            <div class="animate-fade-in">
              <!-- Bookings Tab -->
              @if (activeTab() === 'bookings') {
                <div class="space-y-6">
                  @if (isLoadingBookings()) {
                    <div class="glass-card p-12 rounded-2xl text-center">
                      <i class="fas fa-spinner fa-spin text-cinema-red text-6xl mb-4"></i>
                      <p class="text-slate-400">Loading your bookings...</p>
                    </div>
                  } @else if (userBookings().length > 0) {
                    @for (booking of userBookings(); track booking.bookingId) {
                      <div class="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all">
                        <div class="flex flex-col lg:flex-row gap-6">
                          <!-- QR Code -->
                          <div class="flex-none">
                            <div class="w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center">
                              <div class="w-full h-full bg-gradient-to-br from-cinema-red to-purple-600 rounded-lg flex items-center justify-center">
                                <i class="fas fa-qrcode text-white text-5xl"></i>
                              </div>
                            </div>
                            <button class="mt-3 w-full text-sm text-cinema-red hover:text-cinema-red-light transition-colors">
                              <i class="fas fa-download mr-1"></i>
                              Download
                            </button>
                          </div>

                          <!-- Booking Details -->
                          <div class="flex-1 space-y-4">
                            <div class="flex items-start justify-between">
                              <div>
                                <h3 class="text-2xl font-display font-bold text-white mb-2">
                                  {{ booking.movieTitle }}
                                </h3>
                                <div class="flex items-center gap-2">
                                  <span 
                                    [class.bg-green-500]="booking.status === 'Confirmed'"
                                    [class.bg-red-500]="booking.status === 'Cancelled'"
                                    [class.bg-blue-500]="booking.status === 'Completed'"
                                    class="px-3 py-1 rounded-full text-white text-sm font-semibold">
                                    {{ booking.status }}
                                  </span>
                                </div>
                              </div>
                              <div class="text-right">
                                <p class="text-sm text-slate-400">Booking ID</p>
                                <p class="text-white font-mono font-bold">#{{ booking.bookingId }}</p>
                                <p class="text-xs text-slate-500 mt-1">{{ booking.referenceCode }}</p>
                              </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-cinema-red/20 rounded-lg flex items-center justify-center">
                                  <i class="fas fa-calendar text-cinema-red"></i>
                                </div>
                                <div>
                                  <p class="text-xs text-slate-400">Date & Time</p>
                                  <p class="text-white font-semibold">{{ booking.showtimeStart | date:'MMM d, y - h:mm a' }}</p>
                                </div>
                              </div>

                              <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-cinema-red/20 rounded-lg flex items-center justify-center">
                                  <i class="fas fa-tv text-cinema-red"></i>
                                </div>
                                <div>
                                  <p class="text-xs text-slate-400">Theater</p>
                                  <p class="text-white font-semibold">{{ booking.hallName }}</p>
                                </div>
                              </div>

                              <div class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-cinema-red/20 rounded-lg flex items-center justify-center">
                                  <i class="fas fa-chair text-cinema-red"></i>
                                </div>
                                <div>
                                  <p class="text-xs text-slate-400">Seats</p>
                                  <p class="text-white font-semibold">{{ booking.seats.join(', ') }}</p>
                                </div>
                              </div>
                            </div>

                            <div class="flex items-center justify-between pt-4 border-t border-white/10">
                              <div>
                                <p class="text-sm text-slate-400">Total Amount</p>
                                <p class="text-2xl font-bold text-cinema-red">\${{ booking.totalPrice }}</p>
                              </div>
                              <div class="flex gap-3">
                                @if (booking.status === 'Confirmed') {
                                  <button class="px-6 py-2 bg-cinema-red hover:bg-cinema-red-dark rounded-lg font-semibold transition-colors">
                                    View Ticket
                                  </button>
                                  <button class="px-6 py-2 glass-card hover:bg-white/10 rounded-lg font-semibold transition-colors">
                                    Cancel
                                  </button>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  } @else {
                    <div class="glass-card p-12 rounded-2xl text-center">
                      <i class="fas fa-ticket-alt text-slate-600 text-6xl mb-4"></i>
                      <h3 class="text-xl font-semibold text-white mb-2">No Bookings Yet</h3>
                      <p class="text-slate-400 mb-6">Start booking your favorite movies now!</p>
                      <a routerLink="/home" class="btn-neon ripple px-8 py-3 inline-block">
                        Browse Movies
                      </a>
                    </div>
                  }
                </div>
              }

              <!-- Profile Tab -->
              @if (activeTab() === 'profile') {
                <div class="glass-card p-8 rounded-2xl max-w-2xl">
                  <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-display font-bold text-white">Personal Information</h2>
                    <button 
                      (click)="editMode.set(!editMode())"
                      class="text-cinema-red hover:text-cinema-red-light transition-colors">
                      <i [class.fa-edit]="!editMode()" [class.fa-times]="editMode()" class="fas mr-2"></i>
                      {{ editMode() ? 'Cancel' : 'Edit' }}
                    </button>
                  </div>

                  <form class="space-y-6">
                    <!-- Avatar -->
                    <div class="flex items-center space-x-6">
                      <div class="w-24 h-24 bg-gradient-to-br from-cinema-red to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {{ authService.currentUser()?.firstName?.charAt(0) }}{{ authService.currentUser()?.lastName?.charAt(0) }}
                      </div>
                      @if (editMode()) {
                        <button type="button" class="text-cinema-red hover:text-cinema-red-light transition-colors">
                          <i class="fas fa-camera mr-2"></i>
                          Change Photo
                        </button>
                      }
                    </div>

                    <!-- Form Fields -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label class="block text-slate-400 text-sm mb-2">First Name</label>
                        <input 
                          type="text" 
                          [(ngModel)]="profileForm().firstName"
                          name="firstName"
                          [disabled]="!editMode()"
                          class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white disabled:opacity-50">
                      </div>
                      <div>
                        <label class="block text-slate-400 text-sm mb-2">Last Name</label>
                        <input 
                          type="text" 
                          [(ngModel)]="profileForm().lastName"
                          name="lastName"
                          [disabled]="!editMode()"
                          class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white disabled:opacity-50">
                      </div>
                    </div>

                    <div>
                      <label class="block text-slate-400 text-sm mb-2">Email</label>
                      <input 
                        type="email" 
                        [(ngModel)]="profileForm().email"
                        name="email"
                        [disabled]="!editMode()"
                        class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white disabled:opacity-50">
                    </div>

                    @if (editMode()) {
                      <div class="flex gap-4 pt-4">
                        <button 
                          type="submit" 
                          (click)="saveProfile()"
                          class="btn-neon ripple px-8 py-3">
                          Save Changes
                        </button>
                        <button 
                          type="button" 
                          (click)="cancelEdit()"
                          class="glass-card px-8 py-3 hover:bg-white/10 transition-all">
                          Cancel
                        </button>
                      </div>
                    }
                  </form>
                </div>
              }

              <!-- Settings Tab -->
              @if (activeTab() === 'settings') {
                <div class="space-y-6 max-w-2xl">
                  <!-- Change Password -->
                  <div class="glass-card p-6 rounded-2xl">
                    <h3 class="text-xl font-display font-bold text-white mb-4 flex items-center">
                      <i class="fas fa-lock text-cinema-red mr-3"></i>
                      Change Password
                    </h3>
                    <form (ngSubmit)="changePassword()" class="space-y-4">
                      <div>
                        <label class="block text-slate-400 text-sm mb-2">Current Password</label>
                        <input 
                          type="password"
                          [(ngModel)]="passwordForm().currentPassword"
                          name="currentPassword"
                          required
                          class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white">
                      </div>
                      <div>
                        <label class="block text-slate-400 text-sm mb-2">New Password</label>
                        <input 
                          type="password"
                          [(ngModel)]="passwordForm().newPassword"
                          name="newPassword"
                          required
                          minlength="6"
                          class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white">
                      </div>
                      <div>
                        <label class="block text-slate-400 text-sm mb-2">Confirm New Password</label>
                        <input 
                          type="password"
                          [(ngModel)]="passwordForm().confirmPassword"
                          name="confirmPassword"
                          required
                          class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white">
                      </div>
                      <button type="submit" class="btn-neon ripple px-6 py-3">
                        Update Password
                      </button>
                    </form>
                  </div>

                  <!-- Notifications -->
                  <div class="glass-card p-6 rounded-2xl">
                    <h3 class="text-xl font-display font-bold text-white mb-4 flex items-center">
                      <i class="fas fa-bell text-cinema-red mr-3"></i>
                      Notifications
                    </h3>
                    <div class="space-y-4">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-white font-semibold">Email Notifications</p>
                          <p class="text-sm text-slate-400">Receive booking confirmations via email</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked class="sr-only peer">
                          <div class="w-11 h-6 bg-midnight-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cinema-red"></div>
                        </label>
                      </div>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-white font-semibold">SMS Notifications</p>
                          <p class="text-sm text-slate-400">Get updates via text message</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" class="sr-only peer">
                          <div class="w-11 h-6 bg-midnight-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cinema-red"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Danger Zone -->
                  <div class="glass-card p-6 rounded-2xl border border-red-500/30">
                    <h3 class="text-xl font-display font-bold text-white mb-4 flex items-center">
                      <i class="fas fa-exclamation-triangle text-red-500 mr-3"></i>
                      Danger Zone
                    </h3>
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="text-white font-semibold">Delete Account</p>
                        <p class="text-sm text-slate-400">Permanently delete your account and all data</p>
                      </div>
                      <button class="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>

                  <!-- Logout -->
                  <button 
                    (click)="logout()"
                    class="w-full glass-card p-4 rounded-2xl hover:bg-white/10 transition-all text-cinema-red font-semibold">
                    <i class="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="max-w-md mx-auto text-center glass-card p-12 rounded-2xl">
            <i class="fas fa-user-lock text-slate-600 text-6xl mb-6"></i>
            <h2 class="text-3xl font-display font-bold text-white mb-4">Login Required</h2>
            <p class="text-slate-400 mb-8">Please login to view your profile and bookings</p>
            <a routerLink="/auth/login" class="btn-neon ripple px-8 py-4 inline-block">
              <i class="fas fa-sign-in-alt mr-2"></i>
              Login
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  protected authService = inject(AuthService);
  private toastService = inject(ToastService);
  private http = inject(HttpClient);
  private router = inject(Router);

  activeTab = signal<'bookings' | 'profile' | 'settings'>('bookings');
  editMode = signal(false);
  
  profileForm = signal({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  passwordForm = signal({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  userBookings = signal<Booking[]>([]);
  isLoadingBookings = signal(false);

  ngOnInit() {
    // Check if user is authenticated, if not redirect to login
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    // Load profile data
    this.loadProfile();
    // Load user bookings
    this.loadBookings();
  }
  
  loadProfile() {
    const user = this.authService.currentUser();
    if (user) {
      this.profileForm.set({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      });
    }
  }
  
  loadBookings() {
    this.isLoadingBookings.set(true);
    this.http.get<any>(`${environment.apiUrl}/Booking/user/my-bookings`).subscribe({
      next: (response) => {
        console.log('Bookings response:', response);
        if (response.success && response.data) {
          this.userBookings.set(response.data);
        } else {
          this.userBookings.set([]);
        }
        this.isLoadingBookings.set(false);
      },
      error: (error) => {
        console.error('Error loading bookings:', error);
        this.toastService.error('Failed to load bookings');
        this.userBookings.set([]);
        this.isLoadingBookings.set(false);
      }
    });
  }
  
  saveProfile() {
    const form = this.profileForm();
    
    this.http.put<any>(`${environment.apiUrl}/User/profile`, form).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.success('Profile updated successfully!');
          this.editMode.set(false);
          // Update current user in auth service
          const currentUser = this.authService.currentUser();
          if (currentUser) {
            const updatedUser = {
              ...currentUser,
              ...form
            };
            localStorage.setItem('cinema_user', JSON.stringify(updatedUser));
          }
        }
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.toastService.error(error.error?.message || 'Failed to update profile');
      }
    });
  }
  
  cancelEdit() {
    this.loadProfile();
    this.editMode.set(false);
  }
  
  changePassword() {
    const form = this.passwordForm();
    
    // Validate passwords match
    if (form.newPassword !== form.confirmPassword) {
      this.toastService.error('New passwords do not match');
      return;
    }
    
    // Validate password length
    if (form.newPassword.length < 6) {
      this.toastService.error('Password must be at least 6 characters');
      return;
    }
    
    const payload = {
      currentPassword: form.currentPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword
    };
    
    this.http.post<any>(`${environment.apiUrl}/User/change-password`, payload).subscribe({
      next: (response) => {
        if (response.success) {
          this.toastService.success('Password changed successfully!');
          // Reset form
          this.passwordForm.set({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
          });
        }
      },
      error: (error) => {
        console.error('Error changing password:', error);
        this.toastService.error(error.error?.message || 'Failed to change password');
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
