using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Movie
{
    public class CreateMovieDto
    {

        [Required(ErrorMessage = "Title is required")]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Range(1, 1000, ErrorMessage = "Duration must be between 1 and 1000 minutes")]
        public int DurationMinutes { get; set; }
        public DateTime ReleaseDate { get; set; }

        public string? PosterUrl { get; set; }
        public string? TrailerUrl { get; set; }
        public List<int> GenreIds { get; set; } = new();
        public List<int> ActorIds { get; set; } = new();
        public List<int> DirectorIds { get; set; } = new();
    }
}