using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class BookedSeat : BaseEntity
    {
        public int BookingId { get; set; }
        public Booking Booking { get; set; } = null!;

        public int SeatId { get; set; }
        public Seat Seat { get; set; } = null!;
        
        public decimal Price { get; set; }
    }
}