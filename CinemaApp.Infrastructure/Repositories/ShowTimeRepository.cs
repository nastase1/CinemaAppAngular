using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Infrastructure.Repositories
{
    public class ShowtimeRepository : BaseRepository<Showtime>, IShowtimeRepository
    {
        public ShowtimeRepository(CinemaAppDbContext context) : base(context) { }


        public async Task<IEnumerable<Showtime>> GetShowtimesByMovieAsync(int movieId)
        {
            return await _context.Showtimes
                .Where(s => s.MovieId == movieId)
                .Include(s => s.Hall) 
                .ToListAsync();
        }

        public async Task<Showtime?> GetWithTicketsAsync(int id)
        {
            return await _context.Showtimes
                .Include(s => s.Hall)

                .Include(s => s.Bookings) 
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<Showtime>> GetShowTimeByDateAync(DateTime date)
        {
            return await _context.Showtimes
                .Where(s => s.StartTime.Date == date.Date)
                .Include(s => s.Hall)
                .Include(s => s.Movie) 
                .ToListAsync();
        }
    }
}