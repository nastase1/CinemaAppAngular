import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Movie } from '../../../core/models/movie.models';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="movie-card group cursor-pointer animate-fade-in">
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
          <div class="absolute top-4 right-4 bg-cinema-red/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 animate-pop">
            <i class="fas fa-star text-yellow-400 text-sm"></i>
            <span class="text-white font-bold text-sm">{{ movie.rating }}</span>
          </div>
        } @else {
          <div class="absolute top-4 right-4 bg-neon-purple/90 backdrop-blur-sm px-3 py-1 rounded-full animate-pop">
            <span class="text-white font-bold text-sm">Coming Soon</span>
          </div>
        }
        
        <!-- Hover Content -->
        <div class="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
          <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            <button 
              [routerLink]="['/movies', movie.id]"
              class="flex-1 bg-cinema-red hover:bg-cinema-red-dark text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
              <i class="fas fa-ticket-alt"></i>
              <span>Book Now</span>
            </button>
            @if (movie.trailerUrl) {
              <button class="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-lg transition-colors duration-300">
                <i class="fas fa-play"></i>
              </button>
            }
          </div>
        </div>
        
        <!-- Shimmer Effect on Load -->
        <div class="absolute inset-0 shimmer pointer-events-none"></div>
      </div>
    </div>
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
}
