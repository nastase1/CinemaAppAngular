using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Domain.Interfaces
{
    public interface IBookingRepository : IGenericRepository<Booking>
    {
        Task<IEnumerable<Booking>> GetUserBookingsAsync(int userId);
        Task<bool> AreSeatsAvailableAsync(int showtimeId, List<int> seatIds);
    }
}