import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-showtimes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-midnight-950 to-midnight-900 pt-24 pb-16">
      <div class="container mx-auto px-6 md:px-12">
        <!-- Header -->
        <div class="mb-12 animate-slideUp">
          <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Showtimes
          </h1>
          <p class="text-slate-400 text-lg">Check out all available showtimes</p>
        </div>

        <!-- Showtimes Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slideUp" style="animation-delay: 0.1s">
          @for (showtime of showtimes; track showtime.id) {
            <div class="glass-card p-6 rounded-2xl hover:border-cinema-red/50 transition-all duration-300">
              <!-- Movie Info -->
              <div class="flex items-start gap-4 mb-4">
                <img [src]="getMovie(showtime.movieId)?.posterUrl" 
                     [alt]="getMovie(showtime.movieId)?.title"
                     class="w-20 h-28 object-cover rounded-lg">
                <div class="flex-1">
                  <h3 class="text-white font-display font-bold text-lg mb-1">
                    {{ getMovie(showtime.movieId)?.title }}
                  </h3>
                  <p class="text-slate-400 text-sm mb-2">
                    {{ getMovie(showtime.movieId)?.genre?.join(', ') }}
                  </p>
                  <div class="flex items-center gap-2 text-xs">
                    <span class="px-2 py-1 bg-cinema-red/20 text-cinema-red rounded">
                      {{ getMovie(showtime.movieId)?.rating }}
                    </span>
                    <span class="text-slate-500">
                      {{ getMovie(showtime.movieId)?.duration }} min
                    </span>
                  </div>
                </div>
              </div>

              <!-- Showtime Details -->
              <div class="border-t border-white/10 pt-4 space-y-2">
                <div class="flex items-center text-slate-300">
                  <i class="fas fa-calendar text-cinema-red w-5"></i>
                  <span class="text-sm">{{ formatDate(showtime.date) }}</span>
                </div>
                <div class="flex items-center text-slate-300">
                  <i class="fas fa-clock text-cinema-red w-5"></i>
                  <span class="text-sm">{{ formatTime(showtime.startTime) }}</span>
                </div>
                <div class="flex items-center text-slate-300">
                  <i class="fas fa-film text-cinema-red w-5"></i>
                  <span class="text-sm">{{ showtime.theaterName }}</span>
                </div>
                <div class="flex items-center text-slate-300">
                  <i class="fas fa-dollar-sign text-cinema-red w-5"></i>
                  <span class="text-sm">\${{ showtime.price }}</span>
                </div>
                <div class="flex items-center text-slate-300">
                  <i class="fas fa-chair text-cinema-red w-5"></i>
                  <span class="text-sm">{{ showtime.availableSeats }} seats available</span>
                </div>
              </div>

              <!-- Book Button -->
              <a [routerLink]="['/booking', showtime.movieId]"
                 class="mt-4 btn-neon w-full block text-center">
                <i class="fas fa-ticket-alt mr-2"></i>
                Book Now
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ShowtimesComponent {
  private bookingService = inject(BookingService);
  private movieService = inject(MovieService);

  showtimes = this.bookingService.getAllShowtimes();

  getMovie(movieId: number) {
    return this.movieService.movies().find(m => m.id === movieId);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatTime(dateTime: string): string {
    return new Date(dateTime).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  }
}
