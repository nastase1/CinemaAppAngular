using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Booking
{
    public class BookingDto
    {
        public int BookingId { get; set; }
        public string ReferenceCode { get; set; } = string.Empty;
        public string MovieTitle { get; set; } = string.Empty;
        public string HallName { get; set; } = string.Empty;
        public DateTime ShowtimeStart { get; set; }

        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public List<string> Seats { get; set; } = new();
    }
}