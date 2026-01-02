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
        
        public async Task<Movie?> GetByIdWithDetailsAsync(int id)
        {
            return await _context.Movies
                .Include(m => m.MovieGenres).ThenInclude(mg => mg.Genre)
                .Include(m=>m.MovieActors).ThenInclude(ma=>ma.Actor)
                .Include(m=>m.MovieDirectors).ThenInclude(md=>md.Director)
                .Include(m=>m.Reviews)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}