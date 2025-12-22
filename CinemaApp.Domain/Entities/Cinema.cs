using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Cinema : BaseEntity
    {
        public required string Name { get; set; }
        public required string Location { get; set; }

        public ICollection<Hall> Halls { get; set; } = new List<Hall>();
    }
}