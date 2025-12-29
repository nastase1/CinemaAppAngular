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
        public string? ReferenceCode { get; set; }
        public BookingStatus Status { get; set; }
        public decimal TotalPrice { get; set; } 
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int ShowtimeId { get; set; }
        public required Showtime Showtime { get; set; }

        private readonly List<Ticket> _tickets = new ();
        public IReadOnlyCollection<Ticket> Tickets => _tickets.AsReadOnly();

        public Booking(string referenceCode, int userId, Showtime showtime)
        {
            // Passed in values
            ReferenceCode = referenceCode;
            UserId = userId;
            Showtime = showtime;
            ShowtimeId = showtime.Id; 

            // DEFAULTS (This is "what happened" to them)
            BookingDate = DateTime.UtcNow;      // Always creation time
            Status = BookingStatus.Pending;     // Start as Pending (or Confirmed)
            TotalPrice = 0;                     // Start at 0, grows as tickets are added
        }
        public void AddTicket(Seat seat, decimal price)
        {
            var ticket = new Ticket(this, seat, price);
            _tickets.Add(ticket);
            TotalPrice += price;
        }


        public void Cancel()
        {
            if (Showtime == null) throw new InvalidOperationException("Showtime data is missing");

            if(Status == BookingStatus.Confirmed && (Showtime.StartTime-DateTime.UtcNow) > TimeSpan.FromHours(2))
            {
                Status = BookingStatus.Cancelled;
                UpdatedAt = DateTime.UtcNow;
            }
        }
    }
}