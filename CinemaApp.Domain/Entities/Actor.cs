using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Actor : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public ICollection<MovieActor> MovieActors { get; set; } = new List<MovieActor>();
    }
}