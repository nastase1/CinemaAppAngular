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
        public DateTime Showtime { get; set; }
        public string HallName { get; set; } = string.Empty;
        
        public decimal TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public List<string> SeatNumbers { get; set; } = new();
    }
}