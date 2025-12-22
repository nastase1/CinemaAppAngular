using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Context;

namespace CinemaApp.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(CinemaAppDbContext context)
        {
            if (context.Cinemas.Any()) return;

            // 1. Cinema
            var cinema = new Cinema 
            { 
                Name = "Cinema City Cotroceni", 
                City = "București", 
                Address = "Vasile Milea 4" 
            };
            await context.Cinemas.AddAsync(cinema);
            await context.SaveChangesAsync();

            // 2. Hall
            var hall = new Hall { Name = "Sala 1", CinemaId = cinema.Id };
            await context.Halls.AddAsync(hall);
            await context.SaveChangesAsync();

            // 3. Seats (10 scaune)
            var seats = new List<Seat>();
            for(int i=1; i<=10; i++)
            {
                seats.Add(new Seat { HallId = hall.Id, Row = 1, Number = i });
            }
            await context.Seats.AddRangeAsync(seats);

            // 4. Movie & Genre
            var genre = new Genre { Name = "Sci-Fi" };
            await context.Genres.AddAsync(genre);
            
            var movie = new Movie 
            { 
                Title = "Inception", 
                Description = "Dream...", 
                DurationMinutes = 148, 
                ReleaseDate = DateTime.Now.AddYears(-10),
                Rating = 9.0 
            };
            await context.Movies.AddAsync(movie);
            await context.SaveChangesAsync();

            // 5. Junction
            await context.MovieGenres.AddAsync(new MovieGenre { MovieId = movie.Id, GenreId = genre.Id });
            await context.SaveChangesAsync();
        }
    }
}