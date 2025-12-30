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
    }
}