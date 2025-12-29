using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Showtime
{
    public class ShowtimeDetailsDto
    {
        public int ShowtimeId { get; set; }
        public string MovieTitle { get; set; } = string.Empty;
        public string HallName { get; set; } = string.Empty;
        public DateTime StartTime { get; set; }
        public List<SeatDto> Seats { get; set; } = new();
    }
}