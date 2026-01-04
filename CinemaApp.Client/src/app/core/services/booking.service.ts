import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { 
  Showtime, 
  Seat, 
  BookingRequest, 
  BookingResponse,
  SeatStatus,
  SeatType
} from '../models/booking.models';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private http = inject(HttpClient);
  
  private selectedSeatsSignal = signal<Seat[]>([]);
  private isLoadingSignal = signal<boolean>(false);
  
  selectedSeats = this.selectedSeatsSignal.asReadonly();
  isLoading = this.isLoadingSignal.asReadonly();
  
  /**
   * Get showtimes for a specific movie
   */
  getShowtimesByMovie(movieId: number): Observable<Showtime[]> {
    // Mock data for now - will connect to API later
    return of(this.getMockShowtimes(movieId));
  }
  
  /**
   * Get seats for a specific showtime
   */
  getSeatsByShowtime(showtimeId: number): Observable<Seat[]> {
    // Mock data for now - will connect to API later
    return of(this.getMockSeats(showtimeId));
  }
  
  /**
   * Toggle seat selection
   */
  toggleSeatSelection(seat: Seat): void {
    if (seat.status === SeatStatus.Booked) return;
    
    const currentSeats = this.selectedSeatsSignal();
    const index = currentSeats.findIndex(s => s.id === seat.id);
    
    if (index > -1) {
      // Deselect seat
      this.selectedSeatsSignal.set(currentSeats.filter(s => s.id !== seat.id));
    } else {
      // Select seat
      this.selectedSeatsSignal.set([...currentSeats, { ...seat, isSelected: true }]);
    }
  }
  
  /**
   * Clear all selected seats
   */
  clearSelection(): void {
    this.selectedSeatsSignal.set([]);
  }
  
  /**
   * Calculate total price
   */
  getTotalPrice(): number {
    return this.selectedSeatsSignal().reduce((sum, seat) => sum + seat.price, 0);
  }
  
  /**
   * Create booking
   */
  createBooking(request: BookingRequest): Observable<BookingResponse> {
    this.isLoadingSignal.set(true);
    
    return this.http.post<BookingResponse>(
      `${environment.apiUrl}/Booking`,
      request
    ).pipe(
      tap(() => {
        this.clearSelection();
        this.isLoadingSignal.set(false);
      }),
      catchError(error => {
        this.isLoadingSignal.set(false);
        return of({
          success: false,
          message: error.error?.message || 'Failed to create booking'
        });
      })
    );
  }
  
  /**
   * Mock showtime data generator
   */
  private getMockShowtimes(movieId: number): Showtime[] {
    const today = new Date();
    const showtimes: Showtime[] = [];
    
    // Generate showtimes for next 7 days
    for (let day = 0; day < 7; day++) {
      const date = new Date(today);
      date.setDate(date.getDate() + day);
      
      const times = ['10:00', '13:30', '16:00', '19:30', '22:00'];
      
      times.forEach((time, index) => {
        const [hours, minutes] = time.split(':').map(Number);
        const startTime = new Date(date);
        startTime.setHours(hours, minutes, 0);
        
        const endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + 2, endTime.getMinutes() + 30);
        
        showtimes.push({
          id: day * 10 + index + 1,
          movieId: movieId,
          movieTitle: 'Selected Movie',
          theaterId: (index % 3) + 1,
          theaterName: `Theater ${(index % 3) + 1}`,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          price: index === 4 ? 15 : 12, // Evening shows more expensive
          availableSeats: Math.floor(Math.random() * 50) + 20,
          date: date.toISOString().split('T')[0]
        });
      });
    }
    
    return showtimes;
  }
  
  /**
   * Mock seat data generator
   */
  private getMockSeats(showtimeId: number): Seat[] {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const seatsPerRow = 12;
    
    rows.forEach((row, rowIndex) => {
      for (let seatNum = 1; seatNum <= seatsPerRow; seatNum++) {
        const isVIP = rowIndex >= 3 && rowIndex <= 5 && seatNum >= 4 && seatNum <= 9;
        const isBooked = Math.random() > 0.7; // 30% chance of being booked
        
        let seatType = SeatType.Regular;
        let price = 12;
        
        if (isVIP) {
          seatType = SeatType.VIP;
          price = 18;
        } else if (rowIndex >= 6) {
          seatType = SeatType.Premium;
          price = 15;
        }
        
        seats.push({
          id: rowIndex * seatsPerRow + seatNum,
          showtimeId: showtimeId,
          row: row,
          number: seatNum,
          type: seatType,
          status: isBooked ? SeatStatus.Booked : SeatStatus.Available,
          price: price,
          isSelected: false
        });
      }
    });
    
    return seats;
  }
}
