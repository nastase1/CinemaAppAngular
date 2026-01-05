using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Enums;
using CinemaApp.Infrastructure.Context;

namespace CinemaApp.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(CinemaAppDbContext context)
        {
            // Seed Admin User
            if (!context.Users.Any())
            {
                var adminUser = new User
                {
                    FirstName = "Admin",
                    LastName = "User",
                    Email = "admin@cinema.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    Role = UserRole.Admin
                };
                await context.Users.AddAsync(adminUser);
                await context.SaveChangesAsync();
            }

            // Seed Genres
            if (!context.Genres.Any())
            {
                var genres = new List<Genre>
                {
                    new Genre { Name = "Action" },
                    new Genre { Name = "Drama" },
                    new Genre { Name = "Comedy" },
                    new Genre { Name = "Sci-Fi" }
                };
                await context.Genres.AddRangeAsync(genres);
                await context.SaveChangesAsync();
            }

            // Seed Movies
            if (!context.Movies.Any())
            {
                var movies = new List<Movie>
                {
                    new Movie
                    {
                        MovieId = Guid.NewGuid(),
                        Title = "Inception",
                        Description = "A mind-bending thriller",
                        Duration = 148,
                        ReleaseDate = new DateTime(2010, 7, 16),
                        PosterUrl = "inception.jpg",
                        TrailerUrl = "https://youtube.com/watch?v=YoHD9XEInc0",
                        Rating = 8.8M,
                        Language = "English",
                        Country = "USA",
                        IsActive = true
                    },
                    new Movie
                    {
                        MovieId = Guid.NewGuid(),
                        Title = "The Dark Knight",
                        Description = "Batman battles the Joker",
                        Duration = 152,
                        ReleaseDate = new DateTime(2008, 7, 18),
                        PosterUrl = "dark-knight.jpg",
                        TrailerUrl = "https://youtube.com/watch?v=EXeTwQWrcwY",
                        Rating = 9.0M,
                        Language = "English",
                        Country = "USA",
                        IsActive = true
                    }
                };
                await context.Movies.AddRangeAsync(movies);
                await context.SaveChangesAsync();
            }

            // Seed Cinemas
            if (!context.Cinemas.Any())
            {
                var cinemas = new List<Cinema>
                {
                    new Cinema { Name = "Cinema City", Location = "Bucharest" },
                    new Cinema { Name = "Movieplex", Location = "Cluj-Napoca" }
                };
                await context.Cinemas.AddRangeAsync(cinemas);
                await context.SaveChangesAsync();
            }

            // Seed Halls
            if (!context.Halls.Any())
            {
                var cinema = context.Cinemas.First();
                var halls = new List<Hall>
                {
                    new Hall { CinemaId = cinema.Id, Name = "Hall 1", Cinema = cinema },
                    new Hall { CinemaId = cinema.Id, Name = "Hall 2", Cinema = cinema }
                };
                await context.Halls.AddRangeAsync(halls);
                await context.SaveChangesAsync();
            }

            // Seed Showtimes
            if (!context.Showtimes.Any())
            {
                var movie = context.Movies.First();
                var hall = context.Halls.First();

                var showtimes = new List<Showtime>();
                for (int i = 0; i < 7; i++)
                {
                    showtimes.Add(new Showtime
                    {
                        MovieId = movie.Id,
                        HallId = hall.Id,
                        Movie = movie,
                        Hall = hall,
                        StartTime = DateTime.Now.AddDays(i).Date.AddHours(18),
                        EndTime = DateTime.Now.AddDays(i).Date.AddHours(20)
                    });
                }
                await context.Showtimes.AddRangeAsync(showtimes);
                await context.SaveChangesAsync();
            }

            // Seed Seats
            if (!context.Seats.Any())
            {
                var halls = context.Halls.ToList();
                var seats = new List<Seat>();

                foreach (var hall in halls)
                {
                    // Create 5 rows (A-E) with 10 seats each
                    char[] rows = { 'A', 'B', 'C', 'D', 'E' };

                    foreach (var row in rows)
                    {
                        for (int seatNumber = 1; seatNumber <= 10; seatNumber++)
                        {
                            // Make row E VIP seats
                            var seatType = row == 'E' ? SeatType.VIP : SeatType.Regular;

                            seats.Add(new Seat
                            {
                                HallId = hall.Id,
                                Hall = hall,
                                Row = row,
                                Number = seatNumber,
                                Type = seatType
                            });
                        }
                    }
                }

                await context.Seats.AddRangeAsync(seats);
                await context.SaveChangesAsync();
            }
        }
    }
}