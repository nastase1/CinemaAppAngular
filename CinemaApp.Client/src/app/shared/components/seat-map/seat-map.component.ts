import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Seat, SeatStatus, SeatType } from '../../../core/models/booking.models';

@Component({
  selector: 'app-seat-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8 animate-fade-in">
      <!-- Screen -->
      <div class="relative">
        <div class="h-2 bg-gradient-to-r from-transparent via-cinema-red to-transparent rounded-full mb-4 animate-glow-pulse"></div>
        <p class="text-center text-slate-400 text-sm uppercase tracking-wider mb-8">Screen</p>
      </div>

      <!-- Legend -->
      <div class="flex flex-wrap justify-center gap-6 mb-8">
        <div class="flex items-center space-x-2">
          <div class="seat-regular w-8 h-8 rounded-lg"></div>
          <span class="text-slate-300 text-sm">Available</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="seat-selected w-8 h-8 rounded-lg"></div>
          <span class="text-slate-300 text-sm">Selected</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="seat-booked w-8 h-8 rounded-lg"></div>
          <span class="text-slate-300 text-sm">Booked</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="seat-vip w-8 h-8 rounded-lg"></div>
          <span class="text-slate-300 text-sm">VIP</span>
        </div>
      </div>

      <!-- Seat Grid -->
      <div class="overflow-x-auto pb-4">
        <div class="inline-block min-w-full">
          @for (row of seatRows; track row) {
            <div class="flex items-center justify-center mb-3">
              <!-- Row Label -->
              <div class="w-8 text-center">
                <span class="text-slate-400 font-bold text-sm">{{ row }}</span>
              </div>
              
              <!-- Seats -->
              <div class="flex gap-2 mx-4">
                @for (seat of getSeatsInRow(row); track seat.id) {
                  <button
                    (click)="onSeatClick(seat)"
                    [disabled]="seat.status === SeatStatus.Booked"
                    [class]="getSeatClass(seat)"
                    [title]="row + seat.number + ' - $' + seat.price"
                    class="relative group transition-all duration-300 transform hover:scale-110">
                    <i class="fas fa-chair text-lg"></i>
                  </button>
                }
              </div>
              
              <!-- Row Label (Right) -->
              <div class="w-8 text-center">
                <span class="text-slate-400 font-bold text-sm">{{ row }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Mobile Scroll Hint -->
      <p class="text-center text-slate-500 text-sm md:hidden">
        <i class="fas fa-hand-point-left mr-2"></i>
        Swipe to see all seats
      </p>
    </div>
  `,
  styles: [`
    .seat-regular {
      @apply bg-slate-700 hover:bg-slate-600 cursor-pointer;
    }
    
    .seat-selected {
      @apply bg-cinema-red hover:bg-cinema-red-dark cursor-pointer animate-pop;
    }
    
    .seat-booked {
      @apply bg-slate-900 cursor-not-allowed opacity-50;
    }
    
    .seat-vip {
      @apply bg-gradient-to-br from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 cursor-pointer;
    }
    
    .seat-premium {
      @apply bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 cursor-pointer;
    }
    
    button {
      @apply w-10 h-10 rounded-lg flex items-center justify-center text-white;
    }
    
    button:disabled {
      @apply cursor-not-allowed opacity-50;
    }
  `]
})
export class SeatMapComponent {
  @Input() seats: Seat[] = [];
  @Input() selectedSeats: Seat[] = [];
  @Output() seatSelected = new EventEmitter<Seat>();
  
  SeatStatus = SeatStatus;
  SeatType = SeatType;
  
  get seatRows(): string[] {
    return [...new Set(this.seats.map(s => s.row))].sort();
  }
  
  getSeatsInRow(row: string): Seat[] {
    return this.seats
      .filter(s => s.row === row)
      .sort((a, b) => a.number - b.number);
  }
  
  isSeatSelected(seat: Seat): boolean {
    return this.selectedSeats.some(s => s.id === seat.id);
  }
  
  getSeatClass(seat: Seat): string {
    if (this.isSeatSelected(seat)) {
      return 'seat-selected';
    }
    
    if (seat.status === SeatStatus.Booked) {
      return 'seat-booked';
    }
    
    if (seat.type === SeatType.VIP) {
      return 'seat-vip';
    }
    
    if (seat.type === SeatType.Premium) {
      return 'seat-premium';
    }
    
    return 'seat-regular';
  }
  
  onSeatClick(seat: Seat): void {
    if (seat.status !== SeatStatus.Booked) {
      this.seatSelected.emit(seat);
    }
  }
}
