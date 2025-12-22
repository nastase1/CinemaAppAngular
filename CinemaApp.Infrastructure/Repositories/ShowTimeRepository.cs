using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Infrastructure.Repositories
{
    public class ShowtimeRepository : BaseRepository<Showtime>, IShowtimeRepository
    {
        public ShowtimeRepository(CinemaAppDbContext context) : base(context) { }

        public async Task<IEnumerable<Showtime>> GetByMovieIdAsync(int movieId)
        {
            return await _context.Showtimes
                .Where(s => s.MovieId == movieId)
                .Include(s => s.Hall)
                .ToListAsync();
        }
    }
}