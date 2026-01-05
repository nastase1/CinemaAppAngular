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
}

export interface Booking {
  bookingId: number;
  referenceCode: string;
  movieTitle: string;
  hallName: string;
  showtimeStart: string;
  totalPrice: number;
  status: string;
  seats: string[];
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking?: Booking;
}
