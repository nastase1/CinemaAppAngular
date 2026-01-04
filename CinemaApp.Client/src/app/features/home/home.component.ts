import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { Movie } from '../../core/models/movie.models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MovieCardComponent],
  template: `
    <!-- Hero Section with Featured Movie -->
    <div class="relative h-screen overflow-hidden">
      @if (featuredMovie) {
        <!-- Background Image with Parallax -->
        <div class="absolute inset-0">
          <img 
            [src]="featuredMovie.backdropUrl" 
            [alt]="featuredMovie.title"
            class="w-full h-full object-cover scale-110 animate-slow-zoom"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-midnight-950 via-midnight-950/80 to-transparent"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-midnight-950/50"></div>
        </div>
        
        <!-- Hero Content -->
        <div class="relative h-full flex items-center">
          <div class="container mx-auto px-6 md:px-12">
            <div class="max-w-3xl space-y-6 animate-slide-up">
              <!-- Badge -->
              <div class="inline-flex items-center space-x-2 bg-cinema-red/20 backdrop-blur-sm border border-cinema-red/30 rounded-full px-4 py-2 animate-pop">
                <div class="w-2 h-2 bg-cinema-red rounded-full animate-pulse"></div>
                <span class="text-cinema-red font-semibold text-sm uppercase tracking-wider">Now Showing</span>
              </div>
              
              <!-- Title -->
              <h1 class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight animate-slide-up" style="animation-delay: 0.1s">
                {{ featuredMovie.title }}
              </h1>
              
              <!-- Meta Info -->
              <div class="flex flex-wrap items-center gap-4 text-slate-300 animate-slide-up" style="animation-delay: 0.2s">
                <div class="flex items-center space-x-2">
                  <i class="fas fa-star text-yellow-400"></i>
                  <span class="font-bold text-white">{{ featuredMovie.rating }}</span>
                </div>
                <span class="text-slate-500">•</span>
                <span>{{ featuredMovie.duration }} min</span>
                <span class="text-slate-500">•</span>
                <span>{{ featuredMovie.releaseDate | date: 'yyyy' }}</span>
                <span class="text-slate-500">•</span>
                <div class="flex gap-2">
                  @for (genre of featuredMovie.genre.slice(0, 3); track genre) {
                    <span class="text-cinema-red">{{ genre }}</span>
                    @if (!$last) {
                      <span class="text-slate-500">,</span>
                    }
                  }
                </div>
              </div>
              
              <!-- Description -->
              <p class="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl animate-slide-up" style="animation-delay: 0.3s">
                {{ featuredMovie.description }}
              </p>
              
              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-4 pt-4 animate-slide-up" style="animation-delay: 0.4s">
                <button 
                  [routerLink]="['/movies', featuredMovie.id]"
                  class="btn-neon ripple px-8 py-4 text-lg font-semibold group">
                  <i class="fas fa-ticket-alt mr-2 group-hover:animate-bounce"></i>
                  Book Tickets
                </button>
                @if (featuredMovie.trailerUrl) {
                  <button class="glass-card px-8 py-4 text-lg font-semibold hover:bg-white/10 transition-all duration-300 group">
                    <i class="fas fa-play mr-2 group-hover:text-cinema-red transition-colors"></i>
                    Watch Trailer
                  </button>
                }
                <button class="glass-card px-6 py-4 hover:bg-white/10 transition-all duration-300">
                  <i class="fas fa-info-circle text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i class="fas fa-chevron-down text-white/50 text-2xl"></i>
        </div>
      }
    </div>

    <!-- Now Showing Section -->
    <div class="bg-midnight-950 py-20">
      <div class="container mx-auto px-6 md:px-12">
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              Now Showing
            </h2>
            <p class="text-slate-400 text-lg">Book your tickets now</p>
          </div>
          <a 
            routerLink="/movies" 
            class="hidden md:flex items-center space-x-2 text-cinema-red hover:text-cinema-red-light transition-colors group">
            <span class="font-semibold">View All</span>
            <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
        
        <!-- Horizontal Scroll Container -->
        <div class="relative">
          <div class="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth">
            @for (movie of nowShowingMovies; track movie.id) {
              <div class="flex-none w-72 snap-start" [style.animation-delay.s]="$index * 0.1">
                <app-movie-card [movie]="movie"></app-movie-card>
              </div>
            }
          </div>
          
          <!-- Gradient Fade Edges -->
          <div class="absolute top-0 left-0 bottom-6 w-20 bg-gradient-to-r from-midnight-950 to-transparent pointer-events-none"></div>
          <div class="absolute top-0 right-0 bottom-6 w-20 bg-gradient-to-l from-midnight-950 to-transparent pointer-events-none"></div>
        </div>
        
        <!-- Mobile View All Button -->
        <div class="md:hidden text-center mt-8">
          <a 
            routerLink="/movies" 
            class="inline-flex items-center space-x-2 text-cinema-red hover:text-cinema-red-light transition-colors">
            <span class="font-semibold">View All Movies</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- Coming Soon Section -->
    <div class="bg-gradient-to-b from-midnight-950 to-midnight-900 py-20">
      <div class="container mx-auto px-6 md:px-12">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Coming Soon
          </h2>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto">
            Get ready for these upcoming blockbusters
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (movie of comingSoonMovies; track movie.id) {
            <div [style.animation-delay.s]="$index * 0.1">
              <app-movie-card [movie]="movie"></app-movie-card>
            </div>
          }
        </div>
      </div>
    </div>

    <!-- Newsletter Section -->
    <div class="bg-midnight-900 py-20">
      <div class="container mx-auto px-6 md:px-12">
        <div class="glass-card p-12 rounded-3xl text-center max-w-4xl mx-auto">
          <div class="mb-8">
            <i class="fas fa-envelope text-cinema-red text-5xl mb-4 animate-bounce"></i>
            <h2 class="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p class="text-slate-300 text-lg">
              Subscribe to our newsletter for exclusive deals and new releases
            </p>
          </div>
          
          <form class="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-6 py-4 bg-midnight-800 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cinema-red transition-colors"
            />
            <button 
              type="submit"
              class="btn-neon ripple px-8 py-4 font-semibold whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slow-zoom {
      0%, 100% { transform: scale(1.1); }
      50% { transform: scale(1.15); }
    }
    
    .animate-slow-zoom {
      animation: slow-zoom 20s ease-in-out infinite;
    }
    
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class HomeComponent implements OnInit {
  private movieService = inject(MovieService);
  
  featuredMovie: Movie | null = null;
  nowShowingMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  
  ngOnInit() {
    this.featuredMovie = this.movieService.getFeaturedMovie();
    this.nowShowingMovies = this.movieService.getNowShowingMovies();
    this.comingSoonMovies = this.movieService.getComingSoonMovies();
  }
}
