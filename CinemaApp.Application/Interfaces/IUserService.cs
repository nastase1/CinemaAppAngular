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
        Task<ServiceResponse<UserProfileDto>> GetUserByIdAsync(int userId);
        Task<ServiceResponse<IEnumerable<UserProfileDto>>> GetAllUsersAsync();
        Task<ServiceResponse<UserProfileDto>> UpdateUserAsync(int userId, UserProfileDto userProfile);
        Task<ServiceResponse<bool>> DeleteUserAsync(int userId);
        Task<ServiceResponse<bool>> ChangePasswordAsync(int userId, string currentPassword, string newPassword);
    }
}