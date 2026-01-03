using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Infrastructure.Repositories
{
    public class BookingRepository : BaseRepository<Booking>, IBookingRepository
    {
        public BookingRepository(CinemaAppDbContext context) : base(context) { }

        public async Task<IEnumerable<Booking>> GetUserBookingsAsync(int userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Include(b => b.Showtime)
                    .ThenInclude(s => s.Movie)
                .Include(b => b.Showtime)
                    .ThenInclude(s => s.Hall)
                        .ThenInclude(h => h.Cinema)
                .Include(b => b.Tickets)
                    .ThenInclude(t => t.Seat)
                .OrderByDescending(b => b.BookingDate)
                .ToListAsync();
        }

        public async Task<bool> AreSeatsAvailableAsync(int showtimeId, List<int> seatIds)
        {
            // Check if any of the requested seats are already booked for this showtime
            var bookedSeats = await _context.Tickets
                .Where(t => t.Booking.ShowtimeId == showtimeId && seatIds.Contains(t.SeatId))
                .Select(t => t.SeatId)
                .ToListAsync();

            return !bookedSeats.Any();
        }
    }
}
