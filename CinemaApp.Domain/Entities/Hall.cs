using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Hall : BaseEntity
    {
        public required string Name { get; set; }
        public int CinemaId { get; set; }
        public required Cinema Cinema { get; set; }
        public ICollection<Seat> Seats { get; set; } = new List<Seat>();
    }
}