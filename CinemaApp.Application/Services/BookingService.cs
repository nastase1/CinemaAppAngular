using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Domain.Enums;
using CinemaApp.Shared.DTOs.Booking;
using CinemaApp.Application.Interfaces;

namespace CinemaApp.Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepo;
        private readonly IShowtimeRepository _showtimeRepo;
        private readonly IGenericRepository<Seat> _seatRepo;

        public BookingService(
            IBookingRepository bookingRepo,
            IShowtimeRepository showtimeRepo,
            IGenericRepository<Seat> seatRepo)
        {
            _bookingRepo = bookingRepo;
            _showtimeRepo = showtimeRepo;
            _seatRepo = seatRepo;
        }

        public async Task<ServiceResponse<BookingDto>> CreateBookingAsync(CreateBookingDto request, int userId)
        {
            var showtime = await _showtimeRepo.GetByIdAsync(request.ShowtimeId);
            if (showtime == null)
                return ServiceResponse<BookingDto>.Fail("Showtime not found.");

            if (DateTime.UtcNow > showtime.StartTime)
                return ServiceResponse<BookingDto>.Fail("Cannot book tickets for a movie that has already started.");

            var areAvailable = await _bookingRepo.AreSeatsAvailableAsync(request.ShowtimeId, request.SeatIds);
            if (!areAvailable)
                return ServiceResponse<BookingDto>.Fail("One or more selected seats are already booked.");



            var booking = new Booking(Guid.NewGuid().ToString().Substring(0, 8).ToUpper(), userId, showtime);

            foreach (var seatId in request.SeatIds)
            {
                var seat = await _seatRepo.GetByIdAsync(seatId);
                if (seat == null)
                    return ServiceResponse<BookingDto>.Fail($"Seat with ID {seatId} not found.");
                decimal price = seat.Type == SeatType.VIP ? 15.0m : 10.0m;
                booking.AddTicket(seat, price);

            }



            await _bookingRepo.AddAsync(booking);

            var responseDto = new BookingDto
            {
                BookingId = booking.Id,
                ReferenceCode = booking.ReferenceCode,
                TotalPrice = booking.TotalPrice,
                Status = booking.Status.ToString()
            };

            return ServiceResponse<BookingDto>.Ok(responseDto);
        }

        public async Task<ServiceResponse<BookingDto>> GetBookingByIdAsync(int bookingId)
        {
            var booking = await _bookingRepo.GetByIdAsync(bookingId);
            if (booking == null)
                return ServiceResponse<BookingDto>.Fail("Booking not found.");

            var dto = new BookingDto
            {
                BookingId = booking.Id,
                ReferenceCode = booking.ReferenceCode,
                TotalPrice = booking.TotalPrice,
                Status = booking.Status.ToString()
            };

            return ServiceResponse<BookingDto>.Ok(dto);
        }

        public async Task<ServiceResponse<IEnumerable<BookingDto>>> GetUserBookingsAsync(int userId)
        {
            var bookings = await _bookingRepo.GetUserBookingsAsync(userId);
            var dtos = bookings.Select(b => new BookingDto
            {
                BookingId = b.Id,
                ReferenceCode = b.ReferenceCode,
                TotalPrice = b.TotalPrice,
                Status = b.Status.ToString()
            });

            return ServiceResponse<IEnumerable<BookingDto>>.Ok(dtos);
        }

        public async Task<ServiceResponse<IEnumerable<BookingDto>>> GetAllBookingsAsync()
        {
            var bookings = await _bookingRepo.GetAllAsync();
            var dtos = bookings.Select(b => new BookingDto
            {
                BookingId = b.Id,
                ReferenceCode = b.ReferenceCode,
                TotalPrice = b.TotalPrice,
                Status = b.Status.ToString()
            });

            return ServiceResponse<IEnumerable<BookingDto>>.Ok(dtos);
        }

        public async Task<ServiceResponse<bool>> CancelBookingAsync(int bookingId, int userId)
        {
            var booking = await _bookingRepo.GetByIdAsync(bookingId);
            if (booking == null)
                return ServiceResponse<bool>.Fail("Booking not found.");

            if (booking.UserId != userId)
                return ServiceResponse<bool>.Fail("You can only cancel your own bookings.");

            if (booking.Status == BookingStatus.Cancelled)
                return ServiceResponse<bool>.Fail("Booking is already cancelled.");

            booking.Cancel();
            await _bookingRepo.UpdateAsync(booking);

            return ServiceResponse<bool>.Ok(true);
        }
    }
}