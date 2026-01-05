import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-b from-midnight-950 to-midnight-900 pt-24 pb-16">
      <div class="container mx-auto px-6 md:px-12">
        <!-- Header -->
        <div class="mb-12 animate-slideUp">
          <h1 class="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            All Movies
          </h1>
          <p class="text-slate-400 text-lg">Browse our complete collection of movies</p>
        </div>

        <!-- Movies Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-slideUp" style="animation-delay: 0.1s">
          @for (movie of movieService.movies(); track movie.id) {
            <app-movie-card [movie]="movie" />
          }
        </div>
      </div>
    </div>
  `,
  styles: [``]
})
export class MoviesComponent {
  movieService = inject(MovieService);
}
