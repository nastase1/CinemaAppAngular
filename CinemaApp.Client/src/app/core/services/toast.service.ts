import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastCounter = 0;
  toasts = signal<Toast[]>([]);

  /**
   * Show success toast
   */
  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  /**
   * Show error toast
   */
  error(message: string, duration = 5000): void {
    this.show(message, 'error', duration);
  }

  /**
   * Show info toast
   */
  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }

  /**
   * Show warning toast
   */
  warning(message: string, duration = 4000): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Show toast with custom type
   */
  private show(message: string, type: Toast['type'], duration: number): void {
    const id = ++this.toastCounter;
    const toast: Toast = { id, message, type, duration };
    
    this.toasts.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  /**
   * Remove toast by id
   */
  remove(id: number): void {
    this.toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  /**
   * Clear all toasts
   */
  clear(): void {
    this.toasts.set([]);
  }
}
