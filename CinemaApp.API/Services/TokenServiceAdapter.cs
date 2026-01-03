using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Services;

namespace CinemaApp.API.Services
{
    public class TokenServiceAdapter : ITokenService
    {
        private readonly JwtTokenService _jwtTokenService;

        public TokenServiceAdapter(JwtTokenService jwtTokenService)
        {
            _jwtTokenService = jwtTokenService;
        }

        public string GenerateToken(User user)
        {
            return _jwtTokenService.GenerateToken(user);
        }
    }
}
