using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Booking
{
    public class CreateBookingDto
    {
        [Required]
        public int ShowtimeId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "You must select at least one seat.")]
        public List<int> SeatIds { get; set; } = new();
    }
}