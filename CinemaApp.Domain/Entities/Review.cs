using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Review : BaseEntity
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int MovieId { get; set; }
        public Movie Movie { get; set; } = null!;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}