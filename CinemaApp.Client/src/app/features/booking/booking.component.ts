import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { SeatMapComponent } from '../../shared/components/seat-map/seat-map.component';
import { Movie } from '../../core/models/movie.models';
import { Showtime, Seat } from '../../core/models/booking.models';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterLink, SeatMapComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-midnight-950 to-midnight-900 pt-24 pb-16">
      <div class="container mx-auto px-6 md:px-12">
        @if (movie()) {
          <!-- Header -->
          <div class="mb-8 animate-slide-up">
            <a routerLink="/home" class="inline-flex items-center text-slate-400 hover:text-cinema-red transition-colors mb-4">
              <i class="fas fa-arrow-left mr-2"></i>
              Back to Movies
            </a>
            <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              {{ movie()?.title }}
            </h1>
            <p class="text-slate-400 text-lg">Select your showtime and seats</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Showtime Selection -->
              <div class="glass-card p-6 rounded-2xl animate-slide-up" style="animation-delay: 0.1s">
                <h2 class="text-2xl font-display font-bold text-white mb-6 flex items-center">
                  <i class="fas fa-calendar-alt text-cinema-red mr-3"></i>
                  Select Showtime
                </h2>
                
                @if (showtimes().length > 0) {
                  <!-- Date Tabs -->
                  <div class="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    @for (date of uniqueDates; track date) {
                      <button
                        (click)="selectedDate.set(date)"
                        [class.bg-cinema-red]="selectedDate() === date"
                        [class.bg-midnight-800]="selectedDate() !== date"
                        class="flex-none px-6 py-3 rounded-xl transition-all duration-300 hover:bg-cinema-red">
                        <div class="text-center">
                          <div class="text-sm text-slate-400">{{ formatDate(date, 'short') }}</div>
                          <div class="text-lg font-bold text-white">{{ formatDate(date, 'day') }}</div>
                        </div>
                      </button>
                    }
                  </div>
                  
                  <!-- Time Slots -->
                  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    @for (showtime of getShowtimesByDate(selectedDate()); track showtime.id) {
                      <button
                        (click)="selectShowtime(showtime)"
                        [class.bg-cinema-red]="selectedShowtime()?.id === showtime.id"
                        [class.bg-midnight-800]="selectedShowtime()?.id !== showtime.id"
                        class="p-4 rounded-xl transition-all duration-300 hover:bg-cinema-red group">
                        <div class="text-center">
                          <div class="text-xl font-bold text-white mb-1">
                            {{ formatTime(showtime.startTime) }}
                          </div>
                          <div class="text-sm text-slate-400">
                            {{ showtime.theaterName }}
                          </div>
                          <div class="text-xs text-slate-500 mt-1">
                            {{ showtime.availableSeats }} seats left
                          </div>
                        </div>
                      </button>
                    }
                  </div>
                } @else {
                  <div class="text-center py-12">
                    <i class="fas fa-calendar-times text-slate-600 text-5xl mb-4"></i>
                    <p class="text-slate-400">No showtimes available</p>
                  </div>
                }
              </div>

              <!-- Seat Selection -->
              @if (selectedShowtime()) {
                <div class="glass-card p-6 rounded-2xl animate-slide-up" style="animation-delay: 0.2s">
                  <h2 class="text-2xl font-display font-bold text-white mb-6 flex items-center">
                    <i class="fas fa-chair text-cinema-red mr-3"></i>
                    Select Seats
                  </h2>
                  
                  @if (seats().length > 0) {
                    <app-seat-map
                      [seats]="seats()"
                      [selectedSeats]="bookingService.selectedSeats()"
                      (seatSelected)="onSeatSelected($event)">
                    </app-seat-map>
                  } @else {
                    <div class="text-center py-12">
                      <div class="animate-spin rounded-full h-12 w-12 border-4 border-cinema-red border-t-transparent mx-auto mb-4"></div>
                      <p class="text-slate-400">Loading seats...</p>
                    </div>
                  }
                </div>
              }
            </div>

            <!-- Booking Summary -->
            <div class="lg:col-span-1">
              <div class="glass-card p-6 rounded-2xl sticky top-24 animate-slide-up" style="animation-delay: 0.3s">
                <h2 class="text-2xl font-display font-bold text-white mb-6">
                  Booking Summary
                </h2>
                
                <!-- Movie Info -->
                <div class="flex gap-4 mb-6 pb-6 border-b border-white/10">
                  <img 
                    [src]="movie()?.posterUrl" 
                    [alt]="movie()?.title"
                    class="w-20 h-28 rounded-lg object-cover"
                  />
                  <div>
                    <h3 class="font-bold text-white mb-1">{{ movie()?.title }}</h3>
                    <p class="text-sm text-slate-400">{{ movie()?.duration }} min</p>
                    @if (movie() && movie()!.genre) {
                      @for (genre of movie()!.genre.slice(0, 2); track genre) {
                        <span class="inline-block text-xs px-2 py-1 bg-white/10 rounded-full text-slate-300 mt-1 mr-1">
                          {{ genre }}
                        </span>
                      }
                    }
                  </div>
                </div>
                
                <!-- Showtime Details -->
                @if (selectedShowtime()) {
                  <div class="space-y-3 mb-6 pb-6 border-b border-white/10">
                    <div class="flex items-center text-slate-300">
                      <i class="fas fa-calendar w-6 text-cinema-red"></i>
                      <span>{{ formatDate(selectedShowtime()!.date, 'full') }}</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="fas fa-clock w-6 text-cinema-red"></i>
                      <span>{{ formatTime(selectedShowtime()!.startTime) }}</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="fas fa-tv w-6 text-cinema-red"></i>
                      <span>{{ selectedShowtime()!.theaterName }}</span>
                    </div>
                  </div>
                }
                
                <!-- Selected Seats -->
                @if (bookingService.selectedSeats().length > 0) {
                  <div class="mb-6 pb-6 border-b border-white/10">
                    <h3 class="font-semibold text-white mb-3">Selected Seats</h3>
                    <div class="flex flex-wrap gap-2">
                      @for (seat of bookingService.selectedSeats(); track seat.id) {
                        <div class="px-3 py-1 bg-cinema-red/20 border border-cinema-red rounded-lg text-cinema-red text-sm font-semibold">
                          {{ seat.row }}{{ seat.number }}
                        </div>
                      }
                    </div>
                  </div>
                  
                  <!-- Price Breakdown -->
                  <div class="space-y-2 mb-6">
                    @for (seat of bookingService.selectedSeats(); track seat.id) {
                      <div class="flex justify-between text-slate-300">
                        <span>{{ seat.row }}{{ seat.number }} ({{ seat.type }})</span>
                        <span>\${{ seat.price }}</span>
                      </div>
                    }
                    <div class="flex justify-between text-xl font-bold text-white pt-3 border-t border-white/10">
                      <span>Total</span>
                      <span class="text-cinema-red">\${{ bookingService.getTotalPrice() }}</span>
                    </div>
                  </div>
                  
                  <!-- Book Button -->
                  @if (authService.isAuthenticated()) {
                    <button
                      (click)="confirmBooking()"
                      [disabled]="bookingService.isLoading()"
                      class="w-full btn-neon ripple py-4 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                      @if (bookingService.isLoading()) {
                        <i class="fas fa-spinner fa-spin mr-2"></i>
                        Processing...
                      } @else {
                        <i class="fas fa-ticket-alt mr-2"></i>
                        Confirm Booking
                      }
                    </button>
                  } @else {
                    <a
                      routerLink="/auth/login"
                      class="block w-full btn-neon ripple py-4 font-bold text-lg text-center">
                      <i class="fas fa-sign-in-alt mr-2"></i>
                      Login to Book
                    </a>
                  }
                } @else {
                  <div class="text-center py-8">
                    <i class="fas fa-chair text-slate-600 text-5xl mb-4"></i>
                    <p class="text-slate-400">Select seats to continue</p>
                  </div>
                }
              </div>
            </div>
          </div>
        } @else {
          <div class="text-center py-20">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-cinema-red border-t-transparent mx-auto mb-4"></div>
            <p class="text-slate-400 text-lg">Loading movie details...</p>
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
export class BookingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  protected bookingService = inject(BookingService);
  protected authService = inject(AuthService);
  
  movie = signal<Movie | null>(null);
  showtimes = signal<Showtime[]>([]);
  seats = signal<Seat[]>([]);
  selectedDate = signal<string>('');
  selectedShowtime = signal<Showtime | null>(null);
  
  get uniqueDates(): string[] {
    return [...new Set(this.showtimes().map(s => s.date))].sort();
  }
  
  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (movieId) {
      // Get movie details
      const movies = this.movieService.movies();
      const foundMovie = movies.find(m => m.id === movieId);
      this.movie.set(foundMovie || null);
      
      // Get showtimes
      this.bookingService.getShowtimesByMovie(movieId).subscribe(showtimes => {
        this.showtimes.set(showtimes);
        if (showtimes.length > 0) {
          this.selectedDate.set(showtimes[0].date);
        }
      });
    }
  }
  
  getShowtimesByDate(date: string): Showtime[] {
    return this.showtimes().filter(s => s.date === date);
  }
  
  selectShowtime(showtime: Showtime) {
    this.selectedShowtime.set(showtime);
    this.bookingService.clearSelection();
    
    // Load seats for this showtime
    this.bookingService.getSeatsByShowtime(showtime.id).subscribe(seats => {
      this.seats.set(seats);
    });
  }
  
  onSeatSelected(seat: Seat) {
    this.bookingService.toggleSeatSelection(seat);
  }
  
  confirmBooking() {
    const showtime = this.selectedShowtime();
    const selectedSeats = this.bookingService.selectedSeats();
    
    if (!showtime || selectedSeats.length === 0) {
      alert('Please select seats first');
      return;
    }
    
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      alert('Please login to complete booking');
      this.router.navigate(['/auth/login']);
      return;
    }
    
    const request = {
      showtimeId: showtime.id,
      seatIds: selectedSeats.map(s => s.id),
      totalAmount: this.bookingService.getTotalPrice()
    };
    
    console.log('Creating booking:', request);
    console.log('Auth token:', this.authService.getToken());
    
    this.bookingService.createBooking(request).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Booking confirmed! Check your profile for ticket details.');
          this.router.navigate(['/profile']);
        } else {
          alert('Booking failed: ' + response.message);
        }
      },
      error: (error) => {
        console.error('Booking error:', error);
        if (error.status === 401) {
          alert('Your session has expired. Please login again.');
          this.authService.logout();
        } else {
          alert('Booking failed: ' + (error.error?.message || 'Unknown error'));
        }
      }
    });
  }
  
  formatDate(date: string, format: 'short' | 'day' | 'full'): string {
    const d = new Date(date);
    
    if (format === 'short') {
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (format === 'day') {
      return d.getDate().toString();
    } else {
      return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
  }
  
  formatTime(dateTime: string): string {
    const d = new Date(dateTime);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
}
