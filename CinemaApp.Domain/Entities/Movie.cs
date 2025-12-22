using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Movie : BaseEntity
    {
        public required string Title { get; set; }
        public string? Description { get; set; }
        public int DurtationInMinutes { get; set; }
        public required string Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
    }
}