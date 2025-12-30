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
        Task<ServiceResponse<string>> RegisterAsync(RegisterRequestDto request);
        Task<ServiceResponse<LoginResponseDto>> LoginAsync(LoginRequestDto request);
    }
}