using CinemaApp.Domain.Entities;

namespace CinemaApp.Domain.Interfaces
{
    public interface IAuthRepository
    {
        Task<User?> LoginAsync(string email);
        Task<bool> UserExistsAsync(string email);
    }
}