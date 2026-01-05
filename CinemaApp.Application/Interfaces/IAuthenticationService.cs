using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.Auth;

namespace CinemaApp.Application.Interfaces
{
    public interface IAuthenticationService
    {
        Task<ServiceResponse<LoginResponseDto>> RegisterAsync(RegisterRequestDto request);
        Task<ServiceResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request);
        Task<ServiceResponse<bool>> ForgotPasswordAsync(string email);
        Task<ServiceResponse<bool>> ResetPasswordAsync(string email, string resetCode, string newPassword);
    }
}