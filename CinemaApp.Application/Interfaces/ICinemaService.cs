using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.Cinema;

namespace CinemaApp.Application.Interfaces
{
    public interface ICinemaService
    {
        Task<ServiceResponse<List<CinemaDto>>> GetAllCinemasAsync();
        Task<ServiceResponse<int>> CreateCinemaAsync(CreateCinemaDto request);
        Task<ServiceResponse<CinemaDto>> GetCinemaByIdAsync(int id);
        Task<ServiceResponse<object>> GetCinemaHallsAsync(int id);
        Task<ServiceResponse<bool>> UpdateCinemaAsync(int id, CreateCinemaDto updateCinemaDto);
        Task<ServiceResponse<bool>> DeleteCinemaAsync(int id);
    }
}