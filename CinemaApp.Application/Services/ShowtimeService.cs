using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.Showtime;

namespace CinemaApp.Application.Services
{
    public class ShowtimeService : IShowtimeService
    {
        private readonly IShowtimeRepository _showtimeRepo;
        private readonly IBookingRepository _bookingRepo;
        private readonly IGenericRepository<Showtime> _showtimeGenericRepo;
        private readonly IGenericRepository<Hall> _hallRepo;

        public ShowtimeService(
            IShowtimeRepository showtimeRepo,
            IBookingRepository bookingRepo,
            IGenericRepository<Showtime> showtimeGenericRepo,
            IGenericRepository<Hall> hallRepo)
        {
            _showtimeRepo = showtimeRepo;
            _bookingRepo = bookingRepo;
            _showtimeGenericRepo = showtimeGenericRepo;
            _hallRepo = hallRepo;
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

        public async Task<ServiceResponse<ShowtimeDetailsDto>> GetShowtimeByIdAsync(int id)
        {
            return await GetShowtimeDetailsAsync(id);
        }

        public async Task<ServiceResponse<IEnumerable<ShowtimeDetailsDto>>> GetShowtimesByMovieIdAsync(int movieId)
        {
            var showtimes = await _showtimeRepo.GetShowtimesByMovieAsync(movieId);
            var movieShowtimes = showtimes.Where(s => s.StartTime > DateTime.UtcNow)
                .Select(s => new ShowtimeDetailsDto
                {
                    ShowtimeId = s.Id,
                    MovieTitle = s.Movie.Title,
                    StartTime = s.StartTime,
                    HallName = s.Hall.Name
                });

            return ServiceResponse<IEnumerable<ShowtimeDetailsDto>>.Ok(movieShowtimes);
        }

        public async Task<ServiceResponse<IEnumerable<ShowtimeDetailsDto>>> GetShowtimesByCinemaAsync(int cinemaId, DateTime? date)
        {
            var showtimes = await _showtimeGenericRepo.GetAllAsync();
            var query = showtimes.Where(s => s.Hall.CinemaId == cinemaId);

            if (date.HasValue)
            {
                query = query.Where(s => s.StartTime.Date == date.Value.Date);
            }

            var cinemaShowtimes = query.Select(s => new ShowtimeDetailsDto
            {
                ShowtimeId = s.Id,
                MovieTitle = s.Movie.Title,
                StartTime = s.StartTime,
                HallName = s.Hall.Name
            });

            return ServiceResponse<IEnumerable<ShowtimeDetailsDto>>.Ok(cinemaShowtimes);
        }

        public async Task<ServiceResponse<IEnumerable<SeatDto>>> GetAvailableSeatsAsync(int showtimeId)
        {
            var showtime = await _showtimeRepo.GetWithTicketsAsync(showtimeId);
            if (showtime == null)
                return ServiceResponse<IEnumerable<SeatDto>>.Fail("Showtime not found.");

            var takenSeatIds = showtime.Bookings?
                .Where(b => b.Status != Domain.Enums.BookingStatus.Cancelled)
                .SelectMany(b => b.Tickets)
                .Select(t => t.SeatId)
                .ToList() ?? new List<int>();

            var availableSeats = showtime.Hall.Seats
                .Where(s => !takenSeatIds.Contains(s.Id))
                .Select(s => new SeatDto
                {
                    Id = s.Id,
                    Row = s.Row,
                    Number = s.Number,
                    Type = s.Type.ToString(),
                    IsBooked = false
                });

            return ServiceResponse<IEnumerable<SeatDto>>.Ok(availableSeats);
        }

        public async Task<ServiceResponse<int>> CreateShowtimeAsync(CreateShowtimeDto request)
        {
            var hall = await _hallRepo.GetByIdAsync(request.HallId);
            if (hall == null)
                return ServiceResponse<int>.Fail("Hall not found.");

            // Note: Showtime entity has required Movie and Hall navigation properties
            // This is a limitation - ideally we'd load these or use a parameterless constructor
            // For now, we'll let EF Core handle the navigation properties after save
            var showtime = new Showtime
            {
                MovieId = request.MovieId,
                HallId = request.HallId,
                StartTime = request.StartTime,
                EndTime = request.StartTime.AddHours(2), // Default 2 hour duration
                Movie = null!, // Will be loaded by EF Core
                Hall = null!   // Will be loaded by EF Core
            };

            await _showtimeGenericRepo.AddAsync(showtime);
            return ServiceResponse<int>.Ok(showtime.Id);
        }

        public async Task<ServiceResponse<bool>> DeleteShowtimeAsync(int id)
        {
            var showtime = await _showtimeGenericRepo.GetByIdAsync(id);
            if (showtime == null)
                return ServiceResponse<bool>.Fail("Showtime not found.");

            await _showtimeGenericRepo.DeleteAsync(id);
            return ServiceResponse<bool>.Ok(true);
        }
    }
}