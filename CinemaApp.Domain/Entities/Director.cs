using CinemaApp.Domain.Common;

namespace CinemaApp.Domain.Entities
{
    public class Director : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public ICollection<MovieDirector> MovieDirectors { get; set; } = new List<MovieDirector>();
    }
}