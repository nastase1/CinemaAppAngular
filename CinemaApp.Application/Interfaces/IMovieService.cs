using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.Movie;

namespace CinemaApp.Application.Interfaces
{
    public interface IMovieService
    {
        Task<ServiceResponse<List<MovieDetailsDto>>> GetAllMoviesAsync();
        Task<ServiceResponse<MovieDetailsDto>> GetMovieByIdAsync(int id);
        Task<ServiceResponse<int>> CreateMovieAsync(CreateMovieDto request);
        Task<ServiceResponse<List<MovieDetailsDto>>> GetNowShowingMoviesAsync();
        Task<ServiceResponse<List<MovieDetailsDto>>> GetComingSoonMoviesAsync();
        Task<ServiceResponse<List<MovieDetailsDto>>> SearchMoviesAsync(string query);
        Task<ServiceResponse<bool>> UpdateMovieAsync(int id, CreateMovieDto updateMovieDto);
        Task<ServiceResponse<bool>> DeleteMovieAsync(int id);
    }
}