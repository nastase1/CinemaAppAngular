using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Showtime
{
    public class SeatDto
    {
        public int Id { get; set; }
        public char Row { get; set; }
        public int Number { get; set; }
        public string Type { get; set; } = "Regular";

        public bool IsBooked { get; set; }
        public decimal Price { get; set; }
    }
}