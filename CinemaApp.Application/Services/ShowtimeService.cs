using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.Showtime;

namespace CinemaApp.Application.Services
{
    public class ShowtimeService : IShowtimeService
    {
        private readonly IShowtimeRepository _showtimeRepo;
        private readonly IBookingRepository _bookingRepo;

        public ShowtimeService(IShowtimeRepository showtimeRepo, IBookingRepository bookingRepo)
        {
            _showtimeRepo = showtimeRepo;
            _bookingRepo = bookingRepo;
        }

        public async Task<ServiceResponse<ShowtimeDetailsDto>> GetShowtimeDetailsAsync(int id)
        {
            var showtime = await _showtimeRepo.GetWithTicketsAsync(id);
            if (showtime == null)
                return ServiceResponse<ShowtimeDetailsDto>.Fail("Showtime not found.");

            var bookedSeatIds = await _bookingRepo.AreSeatsAvailableAsync(id, new List<int>());
            var takenSeatIds = showtime.Bookings?
                .Where(b => b.Status != Domain.Enums.BookingStatus.Cancelled)
                .SelectMany(b => b.Tickets)
                .Select(t => t.SeatId)
                .ToList() ?? new List<int>();

            var dto = new ShowtimeDetailsDto
            {
                ShowtimeId = showtime.Id,
                MovieTitle = showtime.Movie.Title,
                StartTime = showtime.StartTime,
                HallName = showtime.Hall.Name,
                Seats = showtime.Hall.Seats.Select(seat => new SeatDto
                {
                    Id = seat.Id,
                    Row = seat.Row,
                    Number = seat.Number,
                    Type = seat.Type.ToString(),
                    IsBooked = takenSeatIds.Contains(seat.Id)
                }).ToList()
            };

            return ServiceResponse<ShowtimeDetailsDto>.Ok(dto);
        }
    }
}