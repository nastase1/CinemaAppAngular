using CinemaApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace CinemaApp.Infrastructure.Context
{
    public class CinemaAppDbContext : DbContext
    {
        public CinemaAppDbContext(DbContextOptions<CinemaAppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Cinema> Cinemas { get; set; }
        public DbSet<Hall> Halls { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Showtime> Showtimes { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<BookedSeat> BookedSeats { get; set; }
        public DbSet<Review> Reviews { get; set; }
        
        public DbSet<MovieActor> MovieActors { get; set; }
        public DbSet<MovieDirector> MovieDirectors { get; set; }
        public DbSet<MovieGenre> MovieGenres { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}