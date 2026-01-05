import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MovieService } from '../../core/services/movie.service';
import { Movie } from '../../core/models/movie.models';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-midnight-950 to-midnight-900 pt-24 pb-16">
      <div class="container mx-auto px-6 md:px-12">
        @if (authService.isAdmin()) {
          <div class="max-w-7xl mx-auto">
            <!-- Header -->
            <div class="mb-8 animate-slide-up">
              <div class="flex items-center justify-between">
                <div>
                  <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                    <i class="fas fa-shield-alt text-cinema-red mr-4"></i>
                    Admin Panel
                  </h1>
                  <p class="text-slate-400 text-lg">Manage your cinema operations</p>
                </div>
                <a routerLink="/home" class="text-slate-400 hover:text-cinema-red transition-colors">
                  <i class="fas fa-times text-2xl"></i>
                </a>
              </div>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up" style="animation-delay: 0.1s">
              <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-cinema-red/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-film text-cinema-red text-xl"></i>
                  </div>
                  <span class="text-green-400">
                    <i class="fas fa-arrow-up mr-1"></i>
                    12%
                  </span>
                </div>
                <p class="text-slate-400 text-sm">Total Movies</p>
                <p class="text-3xl font-bold text-white">{{ movieService.movies().length }}</p>
              </div>

              <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-ticket-alt text-purple-500 text-xl"></i>
                  </div>
                  <span class="text-green-400">
                    <i class="fas fa-arrow-up mr-1"></i>
                    8%
                  </span>
                </div>
                <p class="text-slate-400 text-sm">Total Bookings</p>
                <p class="text-3xl font-bold text-white">1,234</p>
              </div>

              <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-users text-blue-500 text-xl"></i>
                  </div>
                  <span class="text-green-400">
                    <i class="fas fa-arrow-up mr-1"></i>
                    24%
                  </span>
                </div>
                <p class="text-slate-400 text-sm">Total Users</p>
                <p class="text-3xl font-bold text-white">856</p>
              </div>

              <div class="glass-card p-6 rounded-2xl">
                <div class="flex items-center justify-between mb-4">
                  <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-dollar-sign text-green-500 text-xl"></i>
                  </div>
                  <span class="text-green-400">
                    <i class="fas fa-arrow-up mr-1"></i>
                    15%
                  </span>
                </div>
                <p class="text-slate-400 text-sm">Revenue</p>
                <p class="text-3xl font-bold text-white">\$24,567</p>
              </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="flex gap-4 mb-8 overflow-x-auto pb-2 animate-slide-up scrollbar-hide" style="animation-delay: 0.2s">
              <button
                (click)="activeTab.set('dashboard')"
                [class.bg-cinema-red]="activeTab() === 'dashboard'"
                [class.bg-midnight-800]="activeTab() !== 'dashboard'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-chart-line mr-2"></i>
                Dashboard
              </button>
              <button
                (click)="activeTab.set('movies')"
                [class.bg-cinema-red]="activeTab() === 'movies'"
                [class.bg-midnight-800]="activeTab() !== 'movies'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-film mr-2"></i>
                Movies
              </button>
              <button
                (click)="activeTab.set('showtimes')"
                [class.bg-cinema-red]="activeTab() === 'showtimes'"
                [class.bg-midnight-800]="activeTab() !== 'showtimes'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-clock mr-2"></i>
                Showtimes
              </button>
              <button
                (click)="activeTab.set('theaters')"
                [class.bg-cinema-red]="activeTab() === 'theaters'"
                [class.bg-midnight-800]="activeTab() !== 'theaters'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-tv mr-2"></i>
                Theaters
              </button>
              <button
                (click)="activeTab.set('users')"
                [class.bg-cinema-red]="activeTab() === 'users'"
                [class.bg-midnight-800]="activeTab() !== 'users'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-users mr-2"></i>
                Users
              </button>
              <button
                (click)="activeTab.set('bookings')"
                [class.bg-cinema-red]="activeTab() === 'bookings'"
                [class.bg-midnight-800]="activeTab() !== 'bookings'"
                class="px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap">
                <i class="fas fa-ticket-alt mr-2"></i>
                Bookings
              </button>
            </div>

            <!-- Content Area -->
            <div class="animate-fade-in">
              <!-- Dashboard Tab -->
              @if (activeTab() === 'dashboard') {
                <div class="space-y-6">
                  <!-- Charts Placeholder -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="glass-card p-6 rounded-2xl">
                      <h3 class="text-xl font-display font-bold text-white mb-4">Revenue Chart</h3>
                      <div class="h-64 flex items-center justify-center bg-midnight-800 rounded-xl">
                        <i class="fas fa-chart-bar text-slate-600 text-6xl"></i>
                      </div>
                    </div>
                    <div class="glass-card p-6 rounded-2xl">
                      <h3 class="text-xl font-display font-bold text-white mb-4">Bookings Trend</h3>
                      <div class="h-64 flex items-center justify-center bg-midnight-800 rounded-xl">
                        <i class="fas fa-chart-line text-slate-600 text-6xl"></i>
                      </div>
                    </div>
                  </div>

                  <!-- Recent Activity -->
                  <div class="glass-card p-6 rounded-2xl">
                    <h3 class="text-xl font-display font-bold text-white mb-4">Recent Activity</h3>
                    <div class="space-y-3">
                      @for (activity of recentActivity; track activity.id) {
                        <div class="flex items-center justify-between p-4 bg-midnight-800 rounded-xl">
                          <div class="flex items-center space-x-4">
                            <div [class]="'w-10 h-10 ' + activity.iconBg + ' rounded-lg flex items-center justify-center'">
                              <i [class]="'fas ' + activity.icon + ' ' + activity.iconColor"></i>
                            </div>
                            <div>
                              <p class="text-white font-semibold">{{ activity.title }}</p>
                              <p class="text-sm text-slate-400">{{ activity.description }}</p>
                            </div>
                          </div>
                          <span class="text-sm text-slate-500">{{ activity.time }}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              }

              <!-- Movies Tab -->
              @if (activeTab() === 'movies') {
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-display font-bold text-white">Manage Movies</h2>
                    <button 
                      (click)="showAddMovie.set(true)"
                      class="btn-neon ripple px-6 py-3">
                      <i class="fas fa-plus mr-2"></i>
                      Add New Movie
                    </button>
                  </div>

                  <div class="glass-card rounded-2xl overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-midnight-800">
                          <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Movie</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Genre</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Duration</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Rating</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (movie of movieService.movies(); track movie.id) {
                            <tr class="border-t border-white/10 hover:bg-white/5 transition-colors">
                              <td class="px-6 py-4">
                                <div class="flex items-center space-x-3">
                                  <img [src]="movie.posterUrl" [alt]="movie.title" class="w-12 h-16 rounded object-cover">
                                  <span class="text-white font-semibold">{{ movie.title }}</span>
                                </div>
                              </td>
                              <td class="px-6 py-4 text-slate-300">{{ movie.genre[0] }}</td>
                              <td class="px-6 py-4 text-slate-300">{{ movie.duration }} min</td>
                              <td class="px-6 py-4">
                                <span class="text-yellow-400">
                                  <i class="fas fa-star mr-1"></i>
                                  {{ movie.rating || 'N/A' }}
                                </span>
                              </td>
                              <td class="px-6 py-4">
                                <span 
                                  [class.bg-green-500]="movie.isNowShowing"
                                  [class.bg-blue-500]="movie.isComingSoon"
                                  class="px-3 py-1 rounded-full text-white text-xs font-semibold">
                                  {{ movie.isNowShowing ? 'Now Showing' : 'Coming Soon' }}
                                </span>
                              </td>
                              <td class="px-6 py-4">
                                <div class="flex items-center space-x-2">
                                  <button class="text-blue-400 hover:text-blue-300 transition-colors">
                                    <i class="fas fa-edit"></i>
                                  </button>
                                  <button class="text-red-400 hover:text-red-300 transition-colors">
                                    <i class="fas fa-trash"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }

              <!-- Showtimes Tab -->
              @if (activeTab() === 'showtimes') {
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-display font-bold text-white">Manage Showtimes</h2>
                    <button class="btn-neon ripple px-6 py-3">
                      <i class="fas fa-plus mr-2"></i>
                      Add Showtime
                    </button>
                  </div>

                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    @for (showtime of mockShowtimes; track showtime.id) {
                      <div class="glass-card p-6 rounded-2xl">
                        <div class="flex items-start justify-between mb-4">
                          <div>
                            <h3 class="text-xl font-bold text-white mb-1">{{ showtime.movie }}</h3>
                            <p class="text-slate-400">{{ showtime.theater }}</p>
                          </div>
                          <div class="flex items-center space-x-2">
                            <button class="text-blue-400 hover:text-blue-300">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="text-red-400 hover:text-red-300">
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                          <div>
                            <p class="text-sm text-slate-400">Date</p>
                            <p class="text-white font-semibold">{{ showtime.date }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-slate-400">Time</p>
                            <p class="text-white font-semibold">{{ showtime.time }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-slate-400">Price</p>
                            <p class="text-cinema-red font-semibold">\${{ showtime.price }}</p>
                          </div>
                          <div>
                            <p class="text-sm text-slate-400">Available Seats</p>
                            <p class="text-white font-semibold">{{ showtime.seats }}</p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Theaters Tab -->
              @if (activeTab() === 'theaters') {
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-display font-bold text-white">Manage Theaters</h2>
                    <button class="btn-neon ripple px-6 py-3">
                      <i class="fas fa-plus mr-2"></i>
                      Add Theater
                    </button>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    @for (theater of mockTheaters; track theater.id) {
                      <div class="glass-card p-6 rounded-2xl">
                        <div class="flex items-center justify-between mb-4">
                          <div class="w-12 h-12 bg-cinema-red/20 rounded-xl flex items-center justify-center">
                            <i class="fas fa-tv text-cinema-red text-xl"></i>
                          </div>
                          <div class="flex items-center space-x-2">
                            <button class="text-blue-400 hover:text-blue-300">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="text-red-400 hover:text-red-300">
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">{{ theater.name }}</h3>
                        <p class="text-slate-400 text-sm mb-4">{{ theater.location }}</p>
                        <div class="flex items-center justify-between text-sm">
                          <span class="text-slate-400">Capacity</span>
                          <span class="text-white font-bold">{{ theater.capacity }} seats</span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Users Tab -->
              @if (activeTab() === 'users') {
                <div class="space-y-6">
                  <h2 class="text-2xl font-display font-bold text-white">User Management</h2>

                  <div class="glass-card rounded-2xl overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-midnight-800">
                          <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">User</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Email</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Role</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Bookings</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Joined</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (user of mockUsers; track user.id) {
                            <tr class="border-t border-white/10 hover:bg-white/5 transition-colors">
                              <td class="px-6 py-4">
                                <div class="flex items-center space-x-3">
                                  <div class="w-10 h-10 bg-gradient-to-br from-cinema-red to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {{ user.name.charAt(0) }}
                                  </div>
                                  <span class="text-white font-semibold">{{ user.name }}</span>
                                </div>
                              </td>
                              <td class="px-6 py-4 text-slate-300">{{ user.email }}</td>
                              <td class="px-6 py-4">
                                <span 
                                  [class.bg-purple-500]="user.role === 'Admin'"
                                  [class.bg-blue-500]="user.role === 'Customer'"
                                  class="px-3 py-1 rounded-full text-white text-xs font-semibold">
                                  {{ user.role }}
                                </span>
                              </td>
                              <td class="px-6 py-4 text-slate-300">{{ user.bookings }}</td>
                              <td class="px-6 py-4 text-slate-300">{{ user.joined }}</td>
                              <td class="px-6 py-4">
                                <div class="flex items-center space-x-2">
                                  <button class="text-blue-400 hover:text-blue-300 transition-colors">
                                    <i class="fas fa-eye"></i>
                                  </button>
                                  <button class="text-red-400 hover:text-red-300 transition-colors">
                                    <i class="fas fa-ban"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }

              <!-- Bookings Tab -->
              @if (activeTab() === 'bookings') {
                <div class="space-y-6">
                  <h2 class="text-2xl font-display font-bold text-white">Recent Bookings</h2>

                  <div class="glass-card rounded-2xl overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="w-full">
                        <thead class="bg-midnight-800">
                          <tr>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Booking ID</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">User</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Movie</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Seats</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Amount</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Status</th>
                            <th class="px-6 py-4 text-left text-sm font-semibold text-slate-400">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (booking of mockBookings; track booking.id) {
                            <tr class="border-t border-white/10 hover:bg-white/5 transition-colors">
                              <td class="px-6 py-4 text-white font-mono">#{{ booking.id }}</td>
                              <td class="px-6 py-4 text-slate-300">{{ booking.user }}</td>
                              <td class="px-6 py-4 text-white font-semibold">{{ booking.movie }}</td>
                              <td class="px-6 py-4 text-slate-300">{{ booking.seats }}</td>
                              <td class="px-6 py-4 text-cinema-red font-bold">\${{ booking.amount }}</td>
                              <td class="px-6 py-4">
                                <span 
                                  [class.bg-green-500]="booking.status === 'Confirmed'"
                                  [class.bg-blue-500]="booking.status === 'Completed'"
                                  [class.bg-red-500]="booking.status === 'Cancelled'"
                                  class="px-3 py-1 rounded-full text-white text-xs font-semibold">
                                  {{ booking.status }}
                                </span>
                              </td>
                              <td class="px-6 py-4 text-slate-300">{{ booking.date }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        } @else {
          <div class="max-w-md mx-auto text-center glass-card p-12 rounded-2xl">
            <i class="fas fa-ban text-red-500 text-6xl mb-6"></i>
            <h2 class="text-3xl font-display font-bold text-white mb-4">Access Denied</h2>
            <p class="text-slate-400 mb-8">You don't have permission to access the admin panel</p>
            <a routerLink="/home" class="btn-neon ripple px-8 py-4 inline-block">
              <i class="fas fa-home mr-2"></i>
              Back to Home
            </a>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class AdminComponent implements OnInit {
  protected authService = inject(AuthService);
  protected movieService = inject(MovieService);
  private router = inject(Router);

  activeTab = signal<'dashboard' | 'movies' | 'showtimes' | 'theaters' | 'users' | 'bookings'>('dashboard');
  showAddMovie = signal(false);

  recentActivity = [
    { id: 1, icon: 'fa-ticket-alt', iconColor: 'text-purple-500', iconBg: 'bg-purple-500/20', title: 'New Booking', description: 'John Doe booked 2 tickets for Dune', time: '5 min ago' },
    { id: 2, icon: 'fa-user-plus', iconColor: 'text-blue-500', iconBg: 'bg-blue-500/20', title: 'New User', description: 'Sarah Smith created an account', time: '15 min ago' },
    { id: 3, icon: 'fa-film', iconColor: 'text-cinema-red', iconBg: 'bg-cinema-red/20', title: 'Movie Added', description: 'Avatar 3 added to catalog', time: '1 hour ago' },
    { id: 4, icon: 'fa-clock', iconColor: 'text-green-500', iconBg: 'bg-green-500/20', title: 'Showtime Updated', description: 'New showing for Oppenheimer', time: '2 hours ago' }
  ];

  mockShowtimes = [
    { id: 1, movie: 'Dune: Part Three', theater: 'Theater 1', date: 'Jan 15, 2026', time: '7:30 PM', price: 18, seats: 45 },
    { id: 2, movie: 'Oppenheimer', theater: 'Theater 2', date: 'Jan 15, 2026', time: '4:00 PM', price: 15, seats: 32 },
    { id: 3, movie: 'The Matrix', theater: 'Theater 3', date: 'Jan 16, 2026', time: '9:00 PM', price: 18, seats: 28 },
    { id: 4, movie: 'Inception', theater: 'Theater 1', date: 'Jan 16, 2026', time: '6:30 PM', price: 18, seats: 50 }
  ];

  mockTheaters = [
    { id: 1, name: 'Theater 1', location: 'Main Hall, Floor 1', capacity: 120 },
    { id: 2, name: 'Theater 2', location: 'Main Hall, Floor 2', capacity: 96 },
    { id: 3, name: 'Theater 3', location: 'VIP Wing, Floor 3', capacity: 80 }
  ];

  mockUsers = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Customer', bookings: 12, joined: 'Dec 2025' },
    { id: 2, name: 'Admin User', email: 'admin@cinema.com', role: 'Admin', bookings: 0, joined: 'Jan 2024' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Customer', bookings: 8, joined: 'Jan 2026' },
    { id: 4, name: 'Mike Davis', email: 'mike.d@example.com', role: 'Customer', bookings: 15, joined: 'Nov 2025' }
  ];

  mockBookings = [
    { id: 1001, user: 'John Smith', movie: 'Dune: Part Three', seats: 'D5, D6', amount: 36, status: 'Confirmed', date: 'Jan 10, 2026' },
    { id: 1002, user: 'Sarah Johnson', movie: 'Oppenheimer', seats: 'E8', amount: 18, status: 'Confirmed', date: 'Jan 11, 2026' },
    { id: 1003, user: 'Mike Davis', movie: 'The Matrix', seats: 'F10, F11', amount: 36, status: 'Completed', date: 'Jan 08, 2026' },
    { id: 1004, user: 'John Smith', movie: 'Inception', seats: 'G5', amount: 18, status: 'Cancelled', date: 'Jan 09, 2026' }
  ];

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']);
    }
  }
}
