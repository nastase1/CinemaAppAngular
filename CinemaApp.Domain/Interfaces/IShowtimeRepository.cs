using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Domain.Interfaces
{
    public interface IShowtimeRepository : IGenericRepository<Showtime>
    {
        Task<IEnumerable<Showtime>> GetShowtimesByMovieAsync(int movieId);
        Task<IEnumerable<Showtime>> GetShowTimeByDateAync(DateTime date);
        Task<Showtime> GetWithTicketsAsync(int showtimeId);
    }
}