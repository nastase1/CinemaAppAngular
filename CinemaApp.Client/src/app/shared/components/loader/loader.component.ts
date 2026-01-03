import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-midnight-950/95 backdrop-blur-md z-50 flex items-center justify-center">
      <div class="text-center space-y-6 animate-scale-in">
        <!-- Cinema Film Reel Animation -->
        <div class="relative">
          <div class="spinner mx-auto"></div>
          <i class="fas fa-film text-cinema-red text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></i>
        </div>
        
        <div class="space-y-2">
          <h3 class="text-white font-display text-xl">Loading Amazing Experience...</h3>
          <div class="flex justify-center space-x-1">
            <div class="w-2 h-2 bg-cinema-red rounded-full animate-bounce" style="animation-delay: 0s"></div>
            <div class="w-2 h-2 bg-cinema-red rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-cinema-red rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoaderComponent {}
