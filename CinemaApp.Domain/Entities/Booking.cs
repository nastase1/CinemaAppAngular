using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;
using CinemaApp.Domain.Enums;

namespace CinemaApp.Domain.Entities
{
    public class Booking : BaseEntity
    {
        public required string ReferenceCode { get; set; }
        public BookingStatus Status { get; set; }
        public decimal TotalPrice { get; set; } 
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public required Showtime Showtime { get; set; }

        public ICollection<Ticket> Tickets {get; set;} = new List<Ticket>();

        public void Cancel()
        {
            if(Status == BookingStatus.Confirmed && (Showtime.UpdatedAt-DateTime.UtcNow) > TimeSpan.FromHours(2))
            {
                Status = BookingStatus.Cancelled;
                UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}