using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.Booking;

namespace CinemaApp.Application.Interfaces
{
    public interface IBookingService
    {
        Task<ServiceResponse<BookingDto>> CreateBookingAsync(CreateBookingDto request, int userId);
        Task<ServiceResponse<BookingDto>> GetBookingByIdAsync(int bookingId);
        Task<ServiceResponse<IEnumerable<BookingDto>>> GetUserBookingsAsync(int userId);
        Task<ServiceResponse<IEnumerable<BookingDto>>> GetAllBookingsAsync();
        Task<ServiceResponse<bool>> CancelBookingAsync(int bookingId, int userId);
    }
}