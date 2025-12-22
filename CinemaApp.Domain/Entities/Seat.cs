using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;
using CinemaApp.Domain.Enums;

namespace CinemaApp.Domain.Entities
{
    public class Seat: BaseEntity
    {
        public char Row { get; set; }
        public int Number { get; set; }
        public SeatType Type { get; set; }
        public int HallId { get; set; }
        public required Hall Hall { get; set; }

    }
}