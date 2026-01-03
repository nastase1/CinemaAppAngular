using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.User;

namespace CinemaApp.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IGenericRepository<User> _userRepo;

        public UserService(IGenericRepository<User> userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<ServiceResponse<UserProfileDto>> GetProfileAsync(int userId)
        {
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null) return ServiceResponse<UserProfileDto>.Fail("User not found.");

            var dto = new UserProfileDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                TotalBookings = user.Bookings.Count,
                TotalReviews = user.Reviews.Count
            };

            return ServiceResponse<UserProfileDto>.Ok(dto);
        }

        public async Task<ServiceResponse<UserProfileDto>> GetUserByIdAsync(int userId)
        {
            return await GetProfileAsync(userId);
        }

        public async Task<ServiceResponse<IEnumerable<UserProfileDto>>> GetAllUsersAsync()
        {
            var users = await _userRepo.GetAllAsync();
            var dtos = users.Select(user => new UserProfileDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role.ToString(),
                TotalBookings = user.Bookings.Count,
                TotalReviews = user.Reviews.Count
            });

            return ServiceResponse<IEnumerable<UserProfileDto>>.Ok(dtos);
        }

        public async Task<ServiceResponse<UserProfileDto>> UpdateUserAsync(int userId, UserProfileDto userProfile)
        {
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null) return ServiceResponse<UserProfileDto>.Fail("User not found.");

            user.FirstName = userProfile.FirstName;
            user.LastName = userProfile.LastName;
            user.Email = userProfile.Email;

            await _userRepo.UpdateAsync(user);

            return await GetProfileAsync(userId);
        }

        public async Task<ServiceResponse<bool>> DeleteUserAsync(int userId)
        {
            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null) return ServiceResponse<bool>.Fail("User not found.");

            await _userRepo.DeleteAsync(userId);
            return ServiceResponse<bool>.Ok(true);
        }
    }
}