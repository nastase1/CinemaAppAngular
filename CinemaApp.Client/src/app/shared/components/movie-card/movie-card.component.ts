import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie.models';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="movie-card group animate-fade-in">
      <a [routerLink]="['/movies', movie.id]" class="block">
        <div class="relative overflow-hidden rounded-2xl aspect-[2/3] bg-midnight-800">
        <!-- Poster Image -->
        <img 
          [src]="movie.posterUrl" 
          [alt]="movie.title"
          class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
        
        <!-- Rating Badge -->
        @if (movie.rating > 0) {
          <div class="absolute top-4 right-4 bg-cinema-red/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 animate-pop z-10">
            <i class="fas fa-star text-yellow-400 text-sm"></i>
            <span class="text-white font-bold text-sm">{{ movie.rating }}</span>
          </div>
        } @else {
          <div class="absolute top-4 right-4 bg-neon-purple/90 backdrop-blur-sm px-3 py-1 rounded-full animate-pop z-10">
            <span class="text-white font-bold text-sm">Coming Soon</span>
          </div>
        }

        <!-- Info Button (i) -->
        <button 
          (click)="showInfo($event)"
          class="absolute top-4 left-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 z-20 group/info"
          title="Movie Info">
          <i class="fas fa-info text-sm group-hover/info:scale-110 transition-transform"></i>
        </button>
        
        <!-- Hover Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-10">
          <!-- Title -->
          <h3 class="text-xl font-display font-bold text-white mb-2 drop-shadow-lg">
            {{ movie.title }}
          </h3>
          
          <!-- Info -->
          <div class="flex items-center space-x-4 text-sm text-slate-300 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span class="flex items-center">
              <i class="fas fa-clock mr-1"></i>
              {{ movie.duration }} min
            </span>
            <span>{{ movie.releaseDate | date: 'yyyy' }}</span>
          </div>
          
          <!-- Genres -->
          <div class="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
            @for (genre of movie.genre.slice(0, 2); track genre) {
              <span class="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-slate-200">
                {{ genre }}
              </span>
            }
          </div>
          
          <!-- Action Buttons -->
          <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 pointer-events-auto">
            <a 
              [routerLink]="['/booking', movie.id]"
              class="flex-1 bg-cinema-red hover:bg-cinema-red-dark text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 relative z-20">
              <i class="fas fa-ticket-alt"></i>
              <span>Book Now</span>
            </a>
            @if (movie.trailerUrl) {
              <button class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-colors duration-300 relative z-20">
                <i class="fas fa-play"></i>
              </button>
            }
          </div>
        </div>
        
        <!-- Shimmer Effect on Load -->
        <div class="absolute inset-0 shimmer pointer-events-none"></div>
      </div>
    </a>
    </div>

    <!-- Info Modal -->
    @if (showInfoModal()) {
      <div class="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn"
           (click)="closeInfo()">
        <div class="glass-card p-6 rounded-2xl max-w-md mx-4 animate-slideUp"
             (click)="$event.stopPropagation()">
          <!-- Header -->
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-2xl font-display font-bold text-white">
              {{ movie.title }}
            </h3>
            <button (click)="closeInfo()" 
                    class="text-slate-400 hover:text-white transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <!-- Rating & Duration -->
          <div class="flex items-center gap-4 mb-4">
            @if (movie.rating > 0) {
              <div class="flex items-center gap-1 bg-cinema-red/20 px-3 py-1 rounded-full">
                <i class="fas fa-star text-yellow-400"></i>
                <span class="text-white font-bold">{{ movie.rating }}</span>
              </div>
            }
            <span class="text-slate-300">
              <i class="fas fa-clock mr-1"></i>
              {{ movie.duration }} min
            </span>
            <span class="text-slate-300">
              {{ movie.releaseDate | date: 'yyyy' }}
            </span>
          </div>

          <!-- Genres -->
          <div class="flex flex-wrap gap-2 mb-4">
            @for (genre of movie.genre; track genre) {
              <span class="px-3 py-1 bg-white/10 rounded-full text-slate-300 text-sm">
                {{ genre }}
              </span>
            }
          </div>

          <!-- Description -->
          <div class="mb-4">
            <h4 class="text-cinema-red font-semibold mb-2">Description</h4>
            <p class="text-slate-300 text-sm leading-relaxed">
              {{ movie.description }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <a [routerLink]="['/movies', movie.id]"
               class="flex-1 btn-neon text-center"
               (click)="closeInfo()">
              <i class="fas fa-info-circle mr-2"></i>
              Full Details
            </a>
            <a [routerLink]="['/booking', movie.id]"
               class="flex-1 bg-cinema-red hover:bg-cinema-red-dark text-white py-3 px-4 rounded-lg font-semibold transition-colors text-center"
               (click)="closeInfo()">
              <i class="fas fa-ticket-alt mr-2"></i>
              Book Now
            </a>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .movie-card {
      animation: fadeIn 0.6s ease-out forwards;
    }
    
    .shimmer {
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      animation: shimmer 2s ease-in-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;
  showInfoModal = signal(false);

  showInfo(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showInfoModal.set(true);
  }

  closeInfo() {
    this.showInfoModal.set(false);
  }
}
