using CinemaApp.Domain.Entities;

namespace CinemaApp.Domain.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
    }
}