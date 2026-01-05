using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Enums;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.Auth;

namespace CinemaApp.Application.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IUserRepository _userRepo;
        private readonly ITokenService _tokenService;

        public AuthenticationService(IUserRepository userRepo, ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        public async Task<ServiceResponse<LoginResponseDto>> RegisterAsync(RegisterRequestDto request)
        {
            var existingUser = await _userRepo.GetByEmailAsync(request.Email);
            if (existingUser != null)
                return ServiceResponse<LoginResponseDto>.Fail("Email already registered.");

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = UserRole.Customer
            };

            await _userRepo.AddAsync(user);

            // Generate token and return user info
            var token = _tokenService.GenerateToken(user);

            return ServiceResponse<LoginResponseDto>.Ok(new LoginResponseDto
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(24).ToString("o"),
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role.ToString()
                }
            });
        }

        public async Task<ServiceResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request)
        {
            var user = await _userRepo.GetByEmailAsync(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                return ServiceResponse<LoginResponseDto>.Fail("Invalid email or password.");

            var token = _tokenService.GenerateToken(user);

            return ServiceResponse<LoginResponseDto>.Ok(new LoginResponseDto
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(24).ToString("o"),
                User = new UserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Role = user.Role.ToString()
                }
            });
        }

        public async Task<ServiceResponse<bool>> ForgotPasswordAsync(string email)
        {
            var user = await _userRepo.GetByEmailAsync(email);
            if (user == null)
                return ServiceResponse<bool>.Fail("No account found with this email.");

            // Generate 6-digit reset code
            var random = new Random();
            var resetCode = random.Next(100000, 999999).ToString();

            // Set reset code and expiry (15 minutes)
            user.ResetCode = resetCode;
            user.ResetCodeExpiry = DateTime.UtcNow.AddMinutes(15);

            await _userRepo.UpdateAsync(user);

            // In a real application, you would send this code via email
            // For now, we'll just log it (in production, use an email service)
            Console.WriteLine($"Reset code for {email}: {resetCode}");

            return ServiceResponse<bool>.Ok(true, "Reset code sent to your email. Please check your inbox.");
        }

        public async Task<ServiceResponse<bool>> ResetPasswordAsync(string email, string resetCode, string newPassword)
        {
            var user = await _userRepo.GetByEmailAsync(email);
            if (user == null)
                return ServiceResponse<bool>.Fail("Invalid email.");

            if (string.IsNullOrEmpty(user.ResetCode) || user.ResetCode != resetCode)
                return ServiceResponse<bool>.Fail("Invalid reset code.");

            if (user.ResetCodeExpiry == null || user.ResetCodeExpiry < DateTime.UtcNow)
                return ServiceResponse<bool>.Fail("Reset code has expired. Please request a new one.");

            // Update password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
            user.ResetCode = null;
            user.ResetCodeExpiry = null;

            await _userRepo.UpdateAsync(user);

            return ServiceResponse<bool>.Ok(true, "Password reset successfully. You can now login with your new password.");
        }
    }
}