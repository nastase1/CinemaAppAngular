using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.User;

namespace CinemaApp.Application.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<UserProfileDto>> GetProfileAsync(int userId);
    }
}