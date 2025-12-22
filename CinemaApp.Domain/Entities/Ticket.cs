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
        public required Seat Seat { get; set; }
        public int BookingId { get; set; }
        public required Booking Booking { get; set; }
    }
}