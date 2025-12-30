using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Domain.Enums;
using CinemaApp.Shared.DTOs.Booking;

namespace CinemaApp.Application.Services
{
    public class BookingService
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
            // 1. Validate Showtime
            var showtime = await _showtimeRepo.GetByIdAsync(request.ShowtimeId);
            if (showtime == null)
                return ServiceResponse<BookingDto>.Fail("Showtime not found.");

            if (DateTime.UtcNow > showtime.StartTime)
                return ServiceResponse<BookingDto>.Fail("Cannot book tickets for a movie that has already started.");

            // 2. Validate Seats (Availability)
            var areAvailable = await _bookingRepo.AreSeatsAvailableAsync(request.ShowtimeId, request.SeatIds);
            if (!areAvailable)
                return ServiceResponse<BookingDto>.Fail("One or more selected seats are already booked.");

            // 3. Calculate Total Price (and fetch seat entities)
            // Note: In a real app, optimize this to avoid N+1 queries.

            var booking = new Booking(
            Guid.NewGuid().ToString().Substring(0, 8).ToUpper(),
            userId,
            showtime
        );

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
    }
}