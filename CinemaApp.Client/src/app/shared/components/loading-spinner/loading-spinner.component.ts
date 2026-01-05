import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loadingService.isLoading()) {
      <div class="fixed inset-0 z-[200] flex items-center justify-center bg-midnight-950/80 backdrop-blur-sm animate-fadeIn">
        <div class="flex flex-col items-center gap-6">
          <!-- Animated Cinema Logo -->
          <div class="relative w-24 h-24">
            <!-- Outer rotating ring -->
            <div class="absolute inset-0 border-4 border-cinema-red/30 rounded-full animate-spin"></div>
            
            <!-- Inner rotating ring (opposite direction) -->
            <div class="absolute inset-2 border-4 border-t-cinema-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin-reverse"></div>
            
            <!-- Center film icon -->
            <div class="absolute inset-0 flex items-center justify-center">
              <i class="fas fa-film text-cinema-red text-3xl animate-pulse"></i>
            </div>
          </div>

          <!-- Loading Text -->
          <div class="flex flex-col items-center gap-2">
            <p class="text-white font-display text-xl font-semibold animate-pulse">Loading</p>
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-cinema-red rounded-full animate-bounce" style="animation-delay: 0ms"></span>
              <span class="w-2 h-2 bg-cinema-red rounded-full animate-bounce" style="animation-delay: 150ms"></span>
              <span class="w-2 h-2 bg-cinema-red rounded-full animate-bounce" style="animation-delay: 300ms"></span>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes spin-reverse {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }

    .animate-spin-reverse {
      animation: spin-reverse 1s linear infinite;
    }
  `]
})
export class LoadingSpinnerComponent {
  loadingService = inject(LoadingService);
}
