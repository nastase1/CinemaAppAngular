using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Showtime : BaseEntity
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int MovieId { get; set; }
        public required Movie Movie { get; set; }
        public int HallId { get; set; }
        public required Hall Hall { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public bool IsUpcoming => StartTime > DateTime.UtcNow;
    }
}