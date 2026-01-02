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
        public string ReferenceCode { get; set; } 
        public BookingStatus Status { get; set; }
        public decimal TotalPrice { get; set; } 
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int ShowtimeId { get; set; }
        public Showtime Showtime { get; set; }

        private readonly List<Ticket> _tickets = new ();
        public IReadOnlyCollection<Ticket> Tickets => _tickets.AsReadOnly();

        public Booking(string referenceCode, int userId, Showtime showtime)
        {
            if(string.IsNullOrWhiteSpace(referenceCode))
                throw new ArgumentException("Reference code cannot be null or empty.", nameof(referenceCode));

            ReferenceCode = referenceCode;
            UserId = userId;
            Showtime = showtime;
            ShowtimeId = showtime.Id; 

            BookingDate = DateTime.UtcNow;  
            Status = BookingStatus.Pending;     
            TotalPrice = 0;                     
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