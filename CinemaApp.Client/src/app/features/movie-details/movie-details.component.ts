import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { BookingService } from '../../core/services/booking.service';
import { Movie } from '../../core/models/movie.models';
import { Showtime } from '../../core/models/booking.models';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (movie()) {
      <!-- Hero Section with Backdrop -->
      <div class="relative h-[70vh] overflow-hidden">
        <!-- Backdrop Image -->
        <div class="absolute inset-0">
          <img 
            [src]="movie()!.backdropUrl" 
            [alt]="movie()!.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-midnight-950 via-midnight-950/90 to-midnight-950/60"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent"></div>
        </div>

        <!-- Content -->
        <div class="relative h-full container mx-auto px-6 md:px-12 flex items-center">
          <div class="flex flex-col md:flex-row gap-8 w-full">
            <!-- Poster -->
            <div class="flex-none animate-slide-up">
              <img 
                [src]="movie()!.posterUrl" 
                [alt]="movie()!.title"
                class="w-64 rounded-2xl shadow-2xl"
              />
            </div>

            <!-- Movie Info -->
            <div class="flex-1 space-y-6 animate-slide-up" style="animation-delay: 0.1s">
              <!-- Back Button -->
              <a routerLink="/home" class="inline-flex items-center text-slate-400 hover:text-cinema-red transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>
                Back to Movies
              </a>

              <!-- Title -->
              <h1 class="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                {{ movie()!.title }}
              </h1>

              <!-- Meta Info -->
              <div class="flex flex-wrap items-center gap-4 text-slate-300">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-star text-yellow-400"></i>
                  <span class="font-bold text-white">{{ movie()!.rating }}</span>
                  <span class="text-slate-500">/10</span>
                </div>
                <span class="text-slate-500">•</span>
                <span>{{ movie()!.duration }} min</span>
                <span class="text-slate-500">•</span>
                <span>{{ movie()!.releaseDate | date: 'yyyy' }}</span>
                <span class="text-slate-500">•</span>
                <span class="px-3 py-1 bg-white/10 rounded-full text-sm">{{ movie()!.language }}</span>
              </div>

              <!-- Genres -->
              <div class="flex flex-wrap gap-2">
                @for (genre of movie()!.genre; track genre) {
                  <span class="px-4 py-2 bg-cinema-red/20 border border-cinema-red/30 rounded-full text-cinema-red font-semibold">
                    {{ genre }}
                  </span>
                }
              </div>

              <!-- Description -->
              <p class="text-lg text-slate-300 leading-relaxed max-w-3xl">
                {{ movie()!.description }}
              </p>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-4 pt-4">
                <button 
                  (click)="scrollToShowtimes()"
                  class="btn-neon ripple px-8 py-4 text-lg font-semibold group">
                  <i class="fas fa-ticket-alt mr-2"></i>
                  Book Tickets
                </button>
                @if (movie()!.trailerUrl) {
                  <button 
                    (click)="showTrailer.set(true)"
                    class="glass-card px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all group">
                    <i class="fas fa-play mr-2 group-hover:text-cinema-red"></i>
                    Watch Trailer
                  </button>
                }
                <button class="glass-card px-6 py-4 hover:bg-white/10 transition-all">
                  <i class="fas fa-heart text-xl"></i>
                </button>
                <button class="glass-card px-6 py-4 hover:bg-white/10 transition-all">
                  <i class="fas fa-share-alt text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-midnight-950 py-16">
        <div class="container mx-auto px-6 md:px-12 space-y-16">
          <!-- Cast & Crew -->
          <div class="animate-fade-in">
            <h2 class="text-3xl font-display font-bold text-white mb-8 flex items-center">
              <i class="fas fa-users text-cinema-red mr-3"></i>
              Cast & Crew
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Director -->
              <div class="glass-card p-6 rounded-xl">
                <p class="text-slate-400 text-sm mb-2">Director</p>
                <p class="text-xl font-semibold text-white">{{ movie()!.director }}</p>
              </div>
              
              <!-- Language -->
              <div class="glass-card p-6 rounded-xl">
                <p class="text-slate-400 text-sm mb-2">Language</p>
                <p class="text-xl font-semibold text-white">{{ movie()!.language }}</p>
              </div>
            </div>

            <!-- Cast -->
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              @for (actor of movie()!.cast; track actor) {
                <div class="glass-card p-4 rounded-xl text-center hover:bg-white/10 transition-all">
                  <div class="w-16 h-16 bg-gradient-to-br from-cinema-red to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <i class="fas fa-user text-white text-2xl"></i>
                  </div>
                  <p class="text-sm text-white font-semibold">{{ actor }}</p>
                </div>
              }
            </div>
          </div>

          <!-- Showtimes -->
          <div class="animate-fade-in" #showtimesSection>
            <h2 class="text-3xl font-display font-bold text-white mb-8 flex items-center">
              <i class="fas fa-clock text-cinema-red mr-3"></i>
              Available Showtimes
            </h2>

            @if (showtimes().length > 0) {
              <!-- Date Selection -->
              <div class="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
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

              <!-- Showtimes Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                @for (showtime of getShowtimesByDate(selectedDate()); track showtime.id) {
                  <button
                    [routerLink]="['/booking', movie()!.id]"
                    class="glass-card p-6 rounded-xl hover:bg-white/10 transition-all group text-left">
                    <div class="flex items-center justify-between mb-4">
                      <div>
                        <p class="text-2xl font-bold text-white">
                          {{ formatTime(showtime.startTime) }}
                        </p>
                        <p class="text-sm text-slate-400">
                          {{ showtime.theaterName }}
                        </p>
                      </div>
                      <i class="fas fa-arrow-right text-cinema-red text-xl opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all"></i>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-slate-400">
                        <i class="fas fa-chair mr-1"></i>
                        {{ showtime.availableSeats }} seats left
                      </span>
                      <span class="text-cinema-red font-bold">
                        \${{ showtime.price }}
                      </span>
                    </div>
                  </button>
                }
              </div>
            } @else {
              <div class="text-center py-12 glass-card rounded-2xl">
                <i class="fas fa-calendar-times text-slate-600 text-5xl mb-4"></i>
                <p class="text-slate-400 text-lg">No showtimes available</p>
              </div>
            }
          </div>

          <!-- Reviews Section (Mock) -->
          <div class="animate-fade-in">
            <h2 class="text-3xl font-display font-bold text-white mb-8 flex items-center">
              <i class="fas fa-star text-cinema-red mr-3"></i>
              User Reviews
            </h2>

            <div class="space-y-4">
              @for (review of mockReviews; track review.id) {
                <div class="glass-card p-6 rounded-xl">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-cinema-red to-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-bold">{{ review.user.charAt(0) }}</span>
                      </div>
                      <div>
                        <p class="font-semibold text-white">{{ review.user }}</p>
                        <div class="flex items-center space-x-1">
                          @for (star of [1,2,3,4,5]; track star) {
                            <i [class.fas]="star <= review.rating" 
                               [class.far]="star > review.rating"
                               class="fa-star text-yellow-400 text-sm"></i>
                          }
                        </div>
                      </div>
                    </div>
                    <span class="text-sm text-slate-500">{{ review.date }}</span>
                  </div>
                  <p class="text-slate-300 leading-relaxed">{{ review.comment }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Trailer Modal -->
      @if (showTrailer()) {
        <div 
          class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          (click)="showTrailer.set(false)">
          <div class="relative max-w-5xl w-full" (click)="$event.stopPropagation()">
            <button 
              (click)="showTrailer.set(false)"
              class="absolute -top-12 right-0 text-white hover:text-cinema-red transition-colors">
              <i class="fas fa-times text-3xl"></i>
            </button>
            <div class="aspect-video bg-midnight-900 rounded-2xl overflow-hidden glass-card">
              <div class="w-full h-full flex items-center justify-center">
                <i class="fas fa-play-circle text-cinema-red text-8xl"></i>
                <p class="text-white text-xl ml-4">Trailer Player</p>
              </div>
            </div>
          </div>
        </div>
      }
    } @else {
      <div class="min-h-screen bg-midnight-950 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-cinema-red border-t-transparent mx-auto mb-4"></div>
          <p class="text-slate-400 text-lg">Loading movie details...</p>
        </div>
      </div>
    }
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
export class MovieDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movieService = inject(MovieService);
  private bookingService = inject(BookingService);

  movie = signal<Movie | null>(null);
  showtimes = signal<Showtime[]>([]);
  selectedDate = signal<string>('');
  showTrailer = signal(false);

  mockReviews = [
    {
      id: 1,
      user: 'John Smith',
      rating: 5,
      date: '2 days ago',
      comment: 'Absolutely stunning! The visuals are breathtaking and the story keeps you on the edge of your seat. A must-watch for all sci-fi fans.'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      rating: 4,
      date: '1 week ago',
      comment: 'Great movie with excellent performances. The cinematography is top-notch. Highly recommended!'
    },
    {
      id: 3,
      user: 'Mike Davis',
      rating: 5,
      date: '2 weeks ago',
      comment: 'One of the best movies I\'ve seen this year. The soundtrack complements the visuals perfectly.'
    }
  ];

  get uniqueDates(): string[] {
    return [...new Set(this.showtimes().map(s => s.date))].sort();
  }

  ngOnInit() {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));

    if (movieId) {
      const movies = this.movieService.movies();
      const foundMovie = movies.find(m => m.id === movieId);
      this.movie.set(foundMovie || null);

      if (!foundMovie) {
        this.router.navigate(['/home']);
        return;
      }

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

  scrollToShowtimes() {
    const element = document.querySelector('[showtimesSection]');
    element?.scrollIntoView({ behavior: 'smooth' });
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
