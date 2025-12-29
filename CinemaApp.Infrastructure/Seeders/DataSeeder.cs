using CinemaApp.Domain.Entities;
using CinemaApp.Infrastructure.Context;

namespace CinemaApp.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(CinemaAppDbContext context)
        {
            if (context.Cinemas.Any()) return;

            var cinema = new Cinema 
            { 
                Name = "Cinema City Cotroceni", 
                Location = "AFI Cotroceni",
            };
            
            await context.Cinemas.AddAsync(cinema);

            await context.SaveChangesAsync(); 


            var hall = new Hall 
            { 
                Name = "Sala 1", 
                Cinema = cinema 
            };
            
            await context.Halls.AddAsync(hall);
            await context.SaveChangesAsync();

            var seats = new List<Seat>();
            for(int i=1; i<=10; i++)
            {
                seats.Add(new Seat 
                { 
                    Hall = hall, 
                    Row = '1', 
                    Number = i 
                });
            }
            await context.Seats.AddRangeAsync(seats);

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


            await context.MovieGenres.AddAsync(new MovieGenre { MovieId = movie.Id, GenreId = genre.Id });
            
            await context.SaveChangesAsync();
        }
    }
}