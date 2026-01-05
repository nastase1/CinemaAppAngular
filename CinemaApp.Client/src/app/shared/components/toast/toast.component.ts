import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-20 right-4 z-[100] flex flex-col gap-3 max-w-md">
      @for (toast of toastService.toasts(); track toast.id) {
        <div 
          class="toast-item flex items-start gap-3 p-4 rounded-xl backdrop-blur-glass border shadow-2xl transform transition-all duration-300"
          [ngClass]="{
            'bg-green-500/90 border-green-400/50': toast.type === 'success',
            'bg-red-500/90 border-red-400/50': toast.type === 'error',
            'bg-blue-500/90 border-blue-400/50': toast.type === 'info',
            'bg-yellow-500/90 border-yellow-400/50': toast.type === 'warning'
          }"
          (click)="toastService.remove(toast.id)"
        >
          <!-- Icon -->
          <div class="flex-shrink-0 mt-0.5">
            @switch (toast.type) {
              @case ('success') {
                <i class="fas fa-check-circle text-white text-xl"></i>
              }
              @case ('error') {
                <i class="fas fa-times-circle text-white text-xl"></i>
              }
              @case ('info') {
                <i class="fas fa-info-circle text-white text-xl"></i>
              }
              @case ('warning') {
                <i class="fas fa-exclamation-triangle text-white text-xl"></i>
              }
            }
          </div>

          <!-- Message -->
          <p class="flex-1 text-white text-sm font-medium leading-relaxed">
            {{ toast.message }}
          </p>

          <!-- Close Button -->
          <button 
            (click)="toastService.remove(toast.id); $event.stopPropagation()"
            class="flex-shrink-0 text-white/80 hover:text-white transition-colors"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-item {
      animation: slideInRight 0.3s ease-out;
      cursor: pointer;
    }

    .toast-item:hover {
      transform: translateX(-4px);
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
