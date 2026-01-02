using CinemaApp.Domain.Entities;

namespace CinemaApp.Domain.Interfaces
{
    public interface IMovieRepository : IGenericRepository<Movie>
    {
        Task<IEnumerable<Movie>> GetAllWithDetailsAsync();
        Task<Movie?> GetByIdWithDetailsAsync(int id);
    }
}