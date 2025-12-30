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
    public class AuthenticationService: IAuthenticationService
    {
        private readonly IUserRepository _userRepo;
        private readonly ITokenService _tokenService;

        public AuthenticationService(IUserRepository userRepo, ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        public async Task<ServiceResponse<string>> RegisterAsync(RegisterRequestDto request)
        {
            var existingUser = await _userRepo.GetByEmailAsync(request.Email);
            if (existingUser != null)
                return ServiceResponse<string>.Fail("Email already registered.");

            var user = new User
            {
                Email = request.Email,
                FirstName = request.FirstName,
                LastName = request.LastName,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = UserRole.Customer
            };

            await _userRepo.AddAsync(user);
            return ServiceResponse<string>.Ok("User registered successfully.");
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
                Email = user.Email,
                Name = $"{user.FirstName} {user.LastName}"
            });
        }
    }
}