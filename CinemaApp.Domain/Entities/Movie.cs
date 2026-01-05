using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities;

public class Movie : BaseEntity
{
    public Guid MovieId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Duration { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string PosterUrl { get; set; } = string.Empty;
    public string? TrailerUrl { get; set; }
    public decimal Rating { get; set; }
    public string Language { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public bool IsActive { get; set; }

    // Navigation properties
    public virtual ICollection<MovieGenre> MovieGenres { get; set; } = new List<MovieGenre>();
    public virtual ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
    public virtual ICollection<MovieDirector> MovieDirectors { get; set; } = new List<MovieDirector>();
    public virtual ICollection<Showtime> Showtimes { get; set; } = new List<Showtime>();
    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
