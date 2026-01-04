export interface Theater {
  id: number;
  name: string;
  location: string;
  totalSeats: number;
}

export interface Showtime {
  id: number;
  movieId: number;
  movieTitle?: string;
  theaterId: number;
  theaterName?: string;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
  date: string;
}

export enum SeatStatus {
  Available = 'Available',
  Selected = 'Selected',
  Booked = 'Booked',
  VIP = 'VIP'
}

export enum SeatType {
  Regular = 'Regular',
  VIP = 'VIP',
  Premium = 'Premium'
}

export interface Seat {
  id: number;
  showtimeId: number;
  row: string;
  number: number;
  type: SeatType;
  status: SeatStatus;
  price: number;
  isSelected?: boolean;
}

export interface BookingRequest {
  showtimeId: number;
  seatIds: number[];
  totalAmount: number;
}

export interface Booking {
  id: number;
  userId: number;
  showtimeId: number;
  movieTitle: string;
  theaterName: string;
  showtime: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  qrCode?: string;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: Booking;
}
