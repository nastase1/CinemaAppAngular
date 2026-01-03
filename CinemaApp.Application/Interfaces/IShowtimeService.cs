using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.Showtime;

namespace CinemaApp.Application.Interfaces
{
    public interface IShowtimeService
    {
        Task<ServiceResponse<ShowtimeDetailsDto>> GetShowtimeDetailsAsync(int id);
        Task<ServiceResponse<ShowtimeDetailsDto>> GetShowtimeByIdAsync(int id);
        Task<ServiceResponse<IEnumerable<ShowtimeDetailsDto>>> GetShowtimesByMovieIdAsync(int movieId);
        Task<ServiceResponse<IEnumerable<ShowtimeDetailsDto>>> GetShowtimesByCinemaAsync(int cinemaId, DateTime? date);
        Task<ServiceResponse<IEnumerable<SeatDto>>> GetAvailableSeatsAsync(int showtimeId);
        Task<ServiceResponse<int>> CreateShowtimeAsync(CreateShowtimeDto request);
        Task<ServiceResponse<bool>> DeleteShowtimeAsync(int id);
    }
}