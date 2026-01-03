import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-6 py-12 animate-fade-in">
      <!-- Hero Section -->
      <div class="relative h-[600px] rounded-3xl overflow-hidden glass-card mb-16">
        <div class="absolute inset-0 bg-gradient-to-r from-cinema-red/20 to-purple-600/20"></div>
        <div class="absolute inset-0 flex items-center justify-center text-center px-6">
          <div class="space-y-6 animate-slide-up">
            <h1 class="text-6xl md:text-8xl font-display font-bold gradient-text">
              Welcome to CinemaApp
            </h1>
            <p class="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
              Experience the magic of cinema with stunning visuals and seamless booking.
            </p>
            <div class="flex gap-4 justify-center">
              <button class="btn-neon ripple px-8 py-4 text-lg">
                <i class="fas fa-ticket-alt mr-2"></i>
                Book Now
              </button>
              <button class="glass-card px-8 py-4 text-lg hover:bg-white/10 transition-all">
                <i class="fas fa-play mr-2"></i>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Coming Soon Section -->
      <div class="space-y-8">
        <h2 class="text-4xl font-display font-bold text-white">Coming Soon...</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (item of [1, 2, 3]; track item) {
            <div class="glass-card p-8 animate-scale-in text-center">
              <i class="fas fa-film text-cinema-red text-6xl mb-4"></i>
              <h3 class="text-xl font-semibold text-white mb-2">Amazing Features</h3>
              <p class="text-slate-400">Coming in the next steps...</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
