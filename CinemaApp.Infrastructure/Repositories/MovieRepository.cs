using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Infrastructure.Repositories
{
    public class MovieRepository : BaseRepository<Movie>, IMovieRepository
    {
        public MovieRepository(CinemaAppDbContext context) : base(context) { }

        public async Task<IEnumerable<Movie>> GetAllWithDetailsAsync()
        {
            return await _context.Movies
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}