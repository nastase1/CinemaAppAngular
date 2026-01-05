import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { MovieService } from '../../core/services/movie.service';
import { AdminService, CreateMovieDto, CreateShowtimeDto, CreateCinemaDto } from '../../core/services/admin.service';
import { ToastService } from '../../core/services/toast.service';
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
                  <!-- Charts -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Revenue Chart -->
                    <div class="glass-card p-6 rounded-2xl">
                      <h3 class="text-xl font-display font-bold text-white mb-6">Monthly Revenue</h3>
                      <div class="space-y-4">
                        @for (month of revenueData; track month.month) {
                          <div>
                            <div class="flex justify-between text-sm mb-2">
                              <span class="text-slate-400">{{ month.month }}</span>
                              <span class="text-white font-semibold">\${{ month.amount.toLocaleString() }}</span>
                            </div>
                            <div class="h-3 bg-midnight-800 rounded-full overflow-hidden">
                              <div 
                                class="h-full bg-gradient-to-r from-cinema-red to-purple-600 rounded-full transition-all duration-1000"
                                [style.width.%]="(month.amount / maxRevenue) * 100"></div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                    <!-- Bookings Trend Chart -->
                    <div class="glass-card p-6 rounded-2xl">
                      <h3 class="text-xl font-display font-bold text-white mb-6">Weekly Bookings</h3>
                      <div class="flex items-end justify-between h-64 gap-2">
                        @for (day of bookingsData; track day.day) {
                          <div class="flex-1 flex flex-col items-center">
                            <div class="relative w-full mb-2 flex items-end" style="height: 200px;">
                              <div 
                                class="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 hover:from-cinema-red hover:to-purple-600 cursor-pointer group relative"
                                [style.height.%]="(day.bookings / maxBookings) * 100"
                                [title]="day.bookings + ' bookings'">
                                <span class="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  {{ day.bookings }}
                                </span>
                              </div>
                            </div>
                            <span class="text-xs text-slate-400">{{ day.day }}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>

                  <!-- Stats Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="glass-card p-6 rounded-2xl">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-slate-400 text-sm mb-1">Top Movie</p>
                          <p class="text-2xl font-bold text-white">{{ topMovie }}</p>
                          <p class="text-sm text-green-400 mt-1">
                            <i class="fas fa-ticket-alt mr-1"></i>
                            {{ topMovieBookings }} bookings
                          </p>
                        </div>
                        <div class="w-12 h-12 bg-cinema-red/20 rounded-xl flex items-center justify-center">
                          <i class="fas fa-trophy text-cinema-red text-xl"></i>
                        </div>
                      </div>
                    </div>

                    <div class="glass-card p-6 rounded-2xl">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-slate-400 text-sm mb-1">Peak Day</p>
                          <p class="text-2xl font-bold text-white">{{ peakDay }}</p>
                          <p class="text-sm text-blue-400 mt-1">
                            <i class="fas fa-calendar mr-1"></i>
                            Most active
                          </p>
                        </div>
                        <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                          <i class="fas fa-chart-line text-blue-500 text-xl"></i>
                        </div>
                      </div>
                    </div>

                    <div class="glass-card p-6 rounded-2xl">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-slate-400 text-sm mb-1">Avg. Ticket Price</p>
                          <p class="text-2xl font-bold text-white">\${{ avgTicketPrice }}</p>
                          <p class="text-sm text-purple-400 mt-1">
                            <i class="fas fa-dollar-sign mr-1"></i>
                            Per booking
                          </p>
                        </div>
                        <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                          <i class="fas fa-coins text-purple-500 text-xl"></i>
                        </div>
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
                      (click)="openAddMovie()"
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
                                  <button 
                                    (click)="openEditMovie(movie)"
                                    class="text-blue-400 hover:text-blue-300 transition-colors"
                                    title="Edit">
                                    <i class="fas fa-edit"></i>
                                  </button>
                                  <button 
                                    (click)="deleteMovie(movie)"
                                    class="text-red-400 hover:text-red-300 transition-colors"
                                    title="Delete">
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
                    <button 
                      (click)="openAddShowtime()"
                      class="btn-neon ripple px-6 py-3">
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
                            <button 
                              (click)="openEditShowtime(showtime)"
                              class="text-blue-400 hover:text-blue-300"
                              title="Edit">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button 
                              (click)="deleteShowtime(showtime)"
                              class="text-red-400 hover:text-red-300"
                              title="Delete">
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
                    <button 
                      (click)="openAddTheater()"
                      class="btn-neon ripple px-6 py-3">
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
                            <button 
                              (click)="openEditTheater(theater)"
                              class="text-blue-400 hover:text-blue-300"
                              title="Edit">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button 
                              (click)="deleteTheater(theater)"
                              class="text-red-400 hover:text-red-300"
                              title="Delete">
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
                                  <button 
                                    (click)="openEditUser(user)"
                                    class="text-blue-400 hover:text-blue-300 transition-colors"
                                    title="Edit Role">
                                    <i class="fas fa-edit"></i>
                                  </button>
                                  <button 
                                    (click)="banUser(user)"
                                    class="text-red-400 hover:text-red-300 transition-colors"
                                    title="Ban User">
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

        <!-- Movie Add/Edit Modal -->
        @if (showAddMovie() || showEditMovie()) {
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div class="p-6 border-b border-white/10">
                <h2 class="text-2xl font-display font-bold text-white">
                  {{ showAddMovie() ? 'Add New Movie' : 'Edit Movie' }}
                </h2>
              </div>
              <div class="p-6 space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Title</label>
                    <input 
                      type="text" 
                      [(ngModel)]="movieForm().title"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Genre</label>
                    <input 
                      type="text" 
                      [(ngModel)]="movieForm().genre"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Duration (min)</label>
                    <input 
                      type="number" 
                      [(ngModel)]="movieForm().duration"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Rating</label>
                    <input 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="10"
                      [(ngModel)]="movieForm().rating"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Release Date</label>
                    <input 
                      type="date" 
                      [(ngModel)]="movieForm().releaseDate"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                  <div class="flex items-center">
                    <label class="flex items-center space-x-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        [(ngModel)]="movieForm().isNowShowing"
                        class="w-5 h-5 rounded bg-midnight-800 border-white/10 text-cinema-red focus:ring-cinema-red">
                      <span class="text-sm font-semibold text-slate-300">Now Showing</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Description</label>
                  <textarea 
                    [(ngModel)]="movieForm().description"
                    rows="4"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none resize-none"></textarea>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Poster URL</label>
                  <input 
                    type="text" 
                    [(ngModel)]="movieForm().posterUrl"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Backdrop URL</label>
                  <input 
                    type="text" 
                    [(ngModel)]="movieForm().backdropUrl"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Trailer URL</label>
                  <input 
                    type="text" 
                    [(ngModel)]="movieForm().trailerUrl"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
              </div>
              <div class="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button 
                  (click)="showAddMovie.set(false); showEditMovie.set(false)"
                  class="px-6 py-3 bg-midnight-800 hover:bg-midnight-700 text-white rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  (click)="saveMovie()"
                  class="btn-neon ripple px-6 py-3">
                  {{ showAddMovie() ? 'Add Movie' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </div>
        }

        <!-- Showtime Add/Edit Modal -->
        @if (showAddShowtime() || showEditShowtime()) {
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="glass-card rounded-2xl max-w-2xl w-full">
              <div class="p-6 border-b border-white/10">
                <h2 class="text-2xl font-display font-bold text-white">
                  {{ showAddShowtime() ? 'Add New Showtime' : 'Edit Showtime' }}
                </h2>
              </div>
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Movie</label>
                  <select 
                    [(ngModel)]="showtimeForm().movieId"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                    <option value="">Select a movie</option>
                    @for (movie of movieService.movies(); track movie.id) {
                      <option [value]="movie.id">{{ movie.title }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Theater</label>
                  <select 
                    [(ngModel)]="showtimeForm().theaterId"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                    <option value="">Select a theater</option>
                    @for (theater of mockTheaters; track theater.id) {
                      <option [value]="theater.id">{{ theater.name }} - {{ theater.location }}</option>
                    }
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Date</label>
                    <input 
                      type="date" 
                      [(ngModel)]="showtimeForm().date"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-slate-300 mb-2">Time</label>
                    <input 
                      type="time" 
                      [(ngModel)]="showtimeForm().time"
                      class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    [(ngModel)]="showtimeForm().price"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
              </div>
              <div class="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button 
                  (click)="showAddShowtime.set(false); showEditShowtime.set(false)"
                  class="px-6 py-3 bg-midnight-800 hover:bg-midnight-700 text-white rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  (click)="saveShowtime()"
                  class="btn-neon ripple px-6 py-3">
                  {{ showAddShowtime() ? 'Add Showtime' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </div>
        }

        <!-- Theater Add/Edit Modal -->
        @if (showAddTheater() || showEditTheater()) {
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="glass-card rounded-2xl max-w-2xl w-full">
              <div class="p-6 border-b border-white/10">
                <h2 class="text-2xl font-display font-bold text-white">
                  {{ showAddTheater() ? 'Add New Theater' : 'Edit Theater' }}
                </h2>
              </div>
              <div class="p-6 space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Theater Name</label>
                  <input 
                    type="text" 
                    [(ngModel)]="theaterForm().name"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Location</label>
                  <input 
                    type="text" 
                    [(ngModel)]="theaterForm().location"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-300 mb-2">Capacity</label>
                  <input 
                    type="number" 
                    [(ngModel)]="theaterForm().capacity"
                    class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                </div>
              </div>
              <div class="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button 
                  (click)="showAddTheater.set(false); showEditTheater.set(false)"
                  class="px-6 py-3 bg-midnight-800 hover:bg-midnight-700 text-white rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  (click)="saveTheater()"
                  class="btn-neon ripple px-6 py-3">
                  {{ showAddTheater() ? 'Add Theater' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </div>
        }

        <!-- User Edit Modal -->
        @if (showEditUser()) {
          <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div class="glass-card rounded-2xl max-w-md w-full">
              <div class="p-6 border-b border-white/10">
                <h2 class="text-2xl font-display font-bold text-white">Edit User Role</h2>
              </div>
              <div class="p-6">
                @if (selectedUser()) {
                  <div class="space-y-4">
                    <div class="flex items-center space-x-3 mb-6">
                      <div class="w-12 h-12 bg-gradient-to-br from-cinema-red to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {{ selectedUser()!.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="text-white font-semibold">{{ selectedUser()!.name }}</p>
                        <p class="text-slate-400 text-sm">{{ selectedUser()!.email }}</p>
                      </div>
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-slate-300 mb-2">Role</label>
                      <select 
                        [(ngModel)]="userRoleForm().role"
                        class="w-full px-4 py-3 bg-midnight-800 border border-white/10 rounded-xl text-white focus:border-cinema-red focus:outline-none">
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                }
              </div>
              <div class="p-6 border-t border-white/10 flex justify-end space-x-3">
                <button 
                  (click)="showEditUser.set(false)"
                  class="px-6 py-3 bg-midnight-800 hover:bg-midnight-700 text-white rounded-xl transition-colors">
                  Cancel
                </button>
                <button 
                  (click)="saveUserRole()"
                  class="btn-neon ripple px-6 py-3">
                  Save Changes
                </button>
              </div>
            </div>
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
  private adminService = inject(AdminService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  activeTab = signal<'dashboard' | 'movies' | 'showtimes' | 'theaters' | 'users' | 'bookings'>('dashboard');
  
  // Movie modals
  showAddMovie = signal(false);
  showEditMovie = signal(false);
  selectedMovie = signal<Movie | null>(null);
  
  // Showtime modals
  showAddShowtime = signal(false);
  showEditShowtime = signal(false);
  selectedShowtime = signal<any>(null);
  
  // Theater modals
  showAddTheater = signal(false);
  showEditTheater = signal(false);
  selectedTheater = signal<any>(null);
  
  // User modals
  showEditUser = signal(false);
  selectedUser = signal<any>(null);
  
  // Form data
  movieForm = signal({
    title: '',
    description: '',
    genre: '',
    duration: '',
    rating: '',
    posterUrl: '',
    backdropUrl: '',
    trailerUrl: '',
    releaseDate: '',
    isNowShowing: true
  });
  
  showtimeForm = signal({
    movieId: '',
    theaterId: '',
    date: '',
    time: '',
    price: ''
  });
  
  theaterForm = signal({
    name: '',
    location: '',
    capacity: ''
  });
  
  userRoleForm = signal({ role: 'Customer' });

  // Chart data
  revenueData = [
    { month: 'Jan', amount: 18500 },
    { month: 'Feb', amount: 22300 },
    { month: 'Mar', amount: 19800 },
    { month: 'Apr', amount: 26100 },
    { month: 'May', amount: 24567 },
    { month: 'Jun', amount: 28900 }
  ];
  
  maxRevenue = Math.max(...this.revenueData.map(d => d.amount));
  
  bookingsData = [
    { day: 'Mon', bookings: 45 },
    { day: 'Tue', bookings: 62 },
    { day: 'Wed', bookings: 38 },
    { day: 'Thu', bookings: 71 },
    { day: 'Fri', bookings: 95 },
    { day: 'Sat', bookings: 128 },
    { day: 'Sun', bookings: 112 }
  ];
  
  maxBookings = Math.max(...this.bookingsData.map(d => d.bookings));
  
  // Dashboard stats
  topMovie = 'Dune: Part Three';
  topMovieBookings = 342;
  peakDay = 'Saturday';
  avgTicketPrice = 18.50;

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

  // Movie CRUD operations
  openAddMovie() {
    this.movieForm.set({
      title: '',
      description: '',
      genre: '',
      duration: '',
      rating: '',
      posterUrl: '',
      backdropUrl: '',
      trailerUrl: '',
      releaseDate: '',
      isNowShowing: true
    });
    this.showAddMovie.set(true);
  }

  openEditMovie(movie: Movie) {
    this.selectedMovie.set(movie);
    this.movieForm.set({
      title: movie.title,
      description: movie.description,
      genre: movie.genre.join(', '),
      duration: movie.duration.toString(),
      rating: movie.rating.toString(),
      posterUrl: movie.posterUrl,
      backdropUrl: movie.backdropUrl || '',
      trailerUrl: movie.trailerUrl || '',
      releaseDate: movie.releaseDate,
      isNowShowing: movie.isNowShowing
    });
    this.showEditMovie.set(true);
  }

  saveMovie() {
    const form = this.movieForm();
    const movieDto: CreateMovieDto = {
      title: form.title,
      description: form.description,
      durationMinutes: parseInt(form.duration) || 0,
      releaseDate: form.releaseDate,
      posterUrl: form.posterUrl || undefined,
      trailerUrl: form.trailerUrl || undefined,
      genreIds: [], // You may need to map genre string to IDs
      actorIds: [],
      directorIds: []
    };

    if (this.showAddMovie()) {
      // Create new movie
      this.adminService.createMovie(movieDto).subscribe({
        next: (response) => {
          this.toastService.success('Movie created successfully!');
          this.showAddMovie.set(false);
          // Refresh the movie list if needed
        },
        error: (error) => {
          console.error('Error creating movie:', error);
          this.toastService.error(error.error?.message || 'Failed to create movie');
        }
      });
    } else if (this.showEditMovie() && this.selectedMovie()) {
      // Update existing movie
      this.adminService.updateMovie(this.selectedMovie()!.id, movieDto).subscribe({
        next: (response) => {
          this.toastService.success('Movie updated successfully!');
          this.showEditMovie.set(false);
        },
        error: (error) => {
          console.error('Error updating movie:', error);
          this.toastService.error(error.error?.message || 'Failed to update movie');
        }
      });
    }
  }

  deleteMovie(movie: Movie) {
    if (confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      this.adminService.deleteMovie(movie.id).subscribe({
        next: (response) => {
          this.toastService.success('Movie deleted successfully!');
          // Refresh the movie list if needed
        },
        error: (error) => {
          console.error('Error deleting movie:', error);
          this.toastService.error(error.error?.message || 'Failed to delete movie');
        }
      });
    }
  }

  // Showtime CRUD operations
  openAddShowtime() {
    this.showtimeForm.set({
      movieId: '',
      theaterId: '',
      date: '',
      time: '',
      price: ''
    });
    this.showAddShowtime.set(true);
  }

  openEditShowtime(showtime: any) {
    this.selectedShowtime.set(showtime);
    this.showtimeForm.set({
      movieId: showtime.movie,
      theaterId: showtime.theater,
      date: showtime.date,
      time: showtime.time,
      price: showtime.price.toString()
    });
    this.showEditShowtime.set(true);
  }

  saveShowtime() {
    const form = this.showtimeForm();
    const showtimeDto: CreateShowtimeDto = {
      movieId: parseInt(form.movieId),
      hallId: parseInt(form.theaterId),
      startTime: `${form.date}T${form.time}:00`,
      price: parseFloat(form.price)
    };

    this.adminService.createShowtime(showtimeDto).subscribe({
      next: (response) => {
        this.toastService.success('Showtime created successfully!');
        this.showAddShowtime.set(false);
        this.showEditShowtime.set(false);
      },
      error: (error) => {
        console.error('Error creating showtime:', error);
        this.toastService.error(error.error?.message || 'Failed to create showtime');
      }
    });
  }

  deleteShowtime(showtime: any) {
    if (confirm('Are you sure you want to delete this showtime?')) {
      this.adminService.deleteShowtime(showtime.id).subscribe({
        next: (response) => {
          this.toastService.success('Showtime deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting showtime:', error);
          this.toastService.error(error.error?.message || 'Failed to delete showtime');
        }
      });
    }
  }

  // Theater CRUD operations
  openAddTheater() {
    this.theaterForm.set({
      name: '',
      location: '',
      capacity: ''
    });
    this.showAddTheater.set(true);
  }

  openEditTheater(theater: any) {
    this.selectedTheater.set(theater);
    this.theaterForm.set({
      name: theater.name,
      location: theater.location,
      capacity: theater.capacity.toString()
    });
    this.showEditTheater.set(true);
  }

  saveTheater() {
    const form = this.theaterForm();
    const cinemaDto: CreateCinemaDto = {
      name: form.name,
      location: form.location
    };

    if (this.showAddTheater()) {
      this.adminService.createCinema(cinemaDto).subscribe({
        next: (response) => {
          this.toastService.success('Theater created successfully!');
          this.showAddTheater.set(false);
        },
        error: (error) => {
          console.error('Error creating theater:', error);
          this.toastService.error(error.error?.message || 'Failed to create theater');
        }
      });
    } else if (this.showEditTheater() && this.selectedTheater()) {
      this.adminService.updateCinema(this.selectedTheater()!.id, cinemaDto).subscribe({
        next: (response) => {
          this.toastService.success('Theater updated successfully!');
          this.showEditTheater.set(false);
        },
        error: (error) => {
          console.error('Error updating theater:', error);
          this.toastService.error(error.error?.message || 'Failed to update theater');
        }
      });
    }
  }

  deleteTheater(theater: any) {
    if (confirm(`Are you sure you want to delete "${theater.name}"?`)) {
      this.adminService.deleteCinema(theater.id).subscribe({
        next: (response) => {
          this.toastService.success('Theater deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting theater:', error);
          this.toastService.error(error.error?.message || 'Failed to delete theater');
        }
      });
    }
  }

  // User CRUD operations
  openEditUser(user: any) {
    this.selectedUser.set(user);
    this.userRoleForm.set({ role: user.role });
    this.showEditUser.set(true);
  }

  saveUserRole() {
    // Note: The backend doesn't have an endpoint to update user role yet
    // This would need to be added to the backend UserController
    console.log('Updating user role:', this.selectedUser(), this.userRoleForm());
    this.showEditUser.set(false);
    this.toastService.info('User role update not yet implemented in backend');
  }

  banUser(user: any) {
    if (confirm(`Are you sure you want to delete "${user.name}"?`)) {
      this.adminService.deleteUser(user.id).subscribe({
        next: (response) => {
          this.toastService.success('User deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.toastService.error(error.error?.message || 'Failed to delete user');
        }
      });
    }
  }
}
