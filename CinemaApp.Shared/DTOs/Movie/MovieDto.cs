using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Movie
{
    public class MovieDetailsDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DurationMinutes { get; set; }
        public DateTime ReleaseDate { get; set; }

        public double Rating { get; set; }

        public string? PosterUrl { get; set; }
        public string? TrailerUrl { get; set; }
        public bool IsNowShowing { get; set; }
        public bool IsComingSoon { get; set; }

        public List<string> Genres { get; set; } = new();
        public List<string> Directors { get; set; } = new();
        public List<string> Cast { get; set; } = new();
    }
}