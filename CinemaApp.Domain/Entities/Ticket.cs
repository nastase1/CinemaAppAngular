using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Ticket : BaseEntity
    {
        public decimal Price { get; set; }
        public int SeatId { get; set; }
        public Seat Seat { get; set; }
        public int BookingId { get; set; }
        public Booking Booking { get; set; }

        private Ticket() { }

        public Ticket(Booking booking, Seat seat,decimal price)
        {
            Booking = booking;
            BookingId = booking.Id;
            Seat = seat;
            SeatId = seat.Id;
            Price = price;
        }
    }
}