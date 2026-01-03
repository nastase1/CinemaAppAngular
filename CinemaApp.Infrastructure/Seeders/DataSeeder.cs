using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Enums;
using CinemaApp.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace CinemaApp.Infrastructure.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(CinemaAppDbContext context)
        {
            // Check if data already exists
            if (await context.Users.AnyAsync() || await context.Movies.AnyAsync())
            {
                return; // Database already seeded
            }

            // Seed Admin User
            var adminUser = new User
            {
                FirstName = "Admin",
                LastName = "User",
                Email = "admin@cinema.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                Role = UserRole.Admin,
                CreatedAt = DateTime.UtcNow
            };
            await context.Users.AddAsync(adminUser);

            // Seed Test Customer User
            var customerUser = new User
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "john.doe@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Customer@123"),
                Role = UserRole.Customer,
                CreatedAt = DateTime.UtcNow
            };
            await context.Users.AddAsync(customerUser);

            // Seed Genres
            var genres = new List<Genre>
            {
                new Genre { Name = "Action", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Drama", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Comedy", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Horror", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Sci-Fi", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Romance", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Thriller", CreatedAt = DateTime.UtcNow },
                new Genre { Name = "Adventure", CreatedAt = DateTime.UtcNow }
            };
            await context.Genres.AddRangeAsync(genres);

            // Seed Actors
            var actors = new List<Actor>
            {
                new Actor { FirstName = "Leonardo", LastName = "DiCaprio", CreatedAt = DateTime.UtcNow },
                new Actor { FirstName = "Tom", LastName = "Hanks", CreatedAt = DateTime.UtcNow },
                new Actor { FirstName = "Scarlett", LastName = "Johansson", CreatedAt = DateTime.UtcNow },
                new Actor { FirstName = "Robert", LastName = "Downey Jr.", CreatedAt = DateTime.UtcNow },
                new Actor { FirstName = "Jennifer", LastName = "Lawrence", CreatedAt = DateTime.UtcNow }
            };
            await context.Actors.AddRangeAsync(actors);

            // Seed Directors
            var directors = new List<Director>
            {
                new Director { FirstName = "Christopher", LastName = "Nolan", CreatedAt = DateTime.UtcNow },
                new Director { FirstName = "Steven", LastName = "Spielberg", CreatedAt = DateTime.UtcNow },
                new Director { FirstName = "Quentin", LastName = "Tarantino", CreatedAt = DateTime.UtcNow },
                new Director { FirstName = "Martin", LastName = "Scorsese", CreatedAt = DateTime.UtcNow }
            };
            await context.Directors.AddRangeAsync(directors);

            await context.SaveChangesAsync();

            // Seed Movies
            var movies = new List<Movie>
            {
                new Movie
                {
                    Title = "Inception",
                    Description = "A thief who steals corporate secrets through dream-sharing technology",
                    DurationMinutes = 148,
                    ReleaseDate = new DateTime(2010, 7, 16),
                    PosterUrl = "/uploads/movies/inception.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=YoHD9XEInc0",
                    Rating = 8.8,
                    CreatedAt = DateTime.UtcNow
                },
                new Movie
                {
                    Title = "The Dark Knight",
                    Description = "Batman faces the Joker in Gotham City",
                    DurationMinutes = 152,
                    ReleaseDate = new DateTime(2008, 7, 18),
                    PosterUrl = "/uploads/movies/dark-knight.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=EXeTwQWrcwY",
                    Rating = 9.0,
                    CreatedAt = DateTime.UtcNow
                },
                new Movie
                {
                    Title = "Interstellar",
                    Description = "A team of explorers travel through a wormhole in space",
                    DurationMinutes = 169,
                    ReleaseDate = new DateTime(2014, 11, 7),
                    PosterUrl = "/uploads/movies/interstellar.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=zSWdZVtXT7E",
                    Rating = 8.6,
                    CreatedAt = DateTime.UtcNow
                },
                new Movie
                {
                    Title = "Forrest Gump",
                    Description = "The presidencies of Kennedy and Johnson through the eyes of an Alabama man",
                    DurationMinutes = 142,
                    ReleaseDate = new DateTime(1994, 7, 6),
                    PosterUrl = "/uploads/movies/forrest-gump.jpg",
                    TrailerUrl = "https://youtube.com/watch?v=bLvqoHBptjg",
                    Rating = 8.8,
                    CreatedAt = DateTime.UtcNow
                }
            };
            await context.Movies.AddRangeAsync(movies);
            await context.SaveChangesAsync();

            // Seed MovieGenres
            var movieGenres = new List<MovieGenre>
            {
                new MovieGenre { MovieId = movies[0].Id, GenreId = genres[0].Id }, // Inception - Action
                new MovieGenre { MovieId = movies[0].Id, GenreId = genres[4].Id }, // Inception - Sci-Fi
                new MovieGenre { MovieId = movies[1].Id, GenreId = genres[0].Id }, // Dark Knight - Action
                new MovieGenre { MovieId = movies[1].Id, GenreId = genres[6].Id }, // Dark Knight - Thriller
                new MovieGenre { MovieId = movies[2].Id, GenreId = genres[4].Id }, // Interstellar - Sci-Fi
                new MovieGenre { MovieId = movies[2].Id, GenreId = genres[7].Id }, // Interstellar - Adventure
                new MovieGenre { MovieId = movies[3].Id, GenreId = genres[1].Id }, // Forrest Gump - Drama
            };
            await context.MovieGenres.AddRangeAsync(movieGenres);

            // Seed MovieActors
            var movieActors = new List<MovieActor>
            {
                new MovieActor { MovieId = movies[0].Id, ActorId = actors[0].Id },
                new MovieActor { MovieId = movies[2].Id, ActorId = actors[0].Id },
                new MovieActor { MovieId = movies[3].Id, ActorId = actors[1].Id }
            };
            await context.MovieActors.AddRangeAsync(movieActors);

            // Seed MovieDirectors
            var movieDirectors = new List<MovieDirector>
            {
                new MovieDirector { MovieId = movies[0].Id, DirectorId = directors[0].Id },
                new MovieDirector { MovieId = movies[1].Id, DirectorId = directors[0].Id },
                new MovieDirector { MovieId = movies[2].Id, DirectorId = directors[0].Id }
            };
            await context.MovieDirectors.AddRangeAsync(movieDirectors);

            // Seed Cinemas
            var cinemas = new List<Cinema>
            {
                new Cinema
                {
                    Name = "Cinema City Center",
                    Location = "123 Main Street, Bucharest",
                    CreatedAt = DateTime.UtcNow
                },
                new Cinema
                {
                    Name = "Movieplex Mall",
                    Location = "456 Shopping Blvd, Cluj-Napoca",
                    CreatedAt = DateTime.UtcNow
                }
            };
            await context.Cinemas.AddRangeAsync(cinemas);
            await context.SaveChangesAsync();

            // Seed Halls - need to load cinemas with tracking
            var cinema1 = await context.Cinemas.FirstAsync(c => c.Name == "Cinema City Center");
            var cinema2 = await context.Cinemas.FirstAsync(c => c.Name == "Movieplex Mall");

            var halls = new List<Hall>
            {
                new Hall { CinemaId = cinema1.Id, Name = "Hall 1", Cinema = cinema1, CreatedAt = DateTime.UtcNow },
                new Hall { CinemaId = cinema1.Id, Name = "IMAX Hall", Cinema = cinema1, CreatedAt = DateTime.UtcNow },
                new Hall { CinemaId = cinema2.Id, Name = "VIP Hall", Cinema = cinema2, CreatedAt = DateTime.UtcNow }
            };
            await context.Halls.AddRangeAsync(halls);
            await context.SaveChangesAsync();

            // Seed Seats
            var seats = new List<Seat>();
            foreach (var hall in halls)
            {
                int rows = 10; // 10 rows for all halls
                int seatsPerRow = 10; // 10 seats per row

                for (int row = 0; row < rows; row++)
                {
                    char rowLetter = (char)('A' + row);
                    for (int seatNum = 1; seatNum <= seatsPerRow; seatNum++)
                    {
                        SeatType seatType = SeatType.Regular;
                        if (hall.Name.Contains("VIP") || hall.Name.Contains("IMAX"))
                        {
                            seatType = row < 3 ? SeatType.VIP : SeatType.VIP;
                        }

                        seats.Add(new Seat
                        {
                            HallId = hall.Id,
                            Row = rowLetter,
                            Number = seatNum,
                            Type = seatType,
                            Hall = hall,
                            CreatedAt = DateTime.UtcNow
                        });
                    }
                }
            }
            await context.Seats.AddRangeAsync(seats);
            await context.SaveChangesAsync();

            // Seed Showtimes (for next 7 days)
            var showtimes = new List<Showtime>();
            var startDate = DateTime.Today;
            var timeSlots = new[] { 10, 14, 18, 21 }; // 10 AM, 2 PM, 6 PM, 9 PM

            for (int day = 0; day < 7; day++)
            {
                var date = startDate.AddDays(day);
                foreach (var hour in timeSlots)
                {
                    // Add showtime for Inception in Hall 1
                    var inceptionStart = date.AddHours(hour);
                    showtimes.Add(new Showtime
                    {
                        MovieId = movies[0].Id,
                        Movie = movies[0],
                        HallId = halls[0].Id,
                        Hall = halls[0],
                        StartTime = inceptionStart,
                        EndTime = inceptionStart.AddMinutes(movies[0].DurationMinutes),
                        CreatedAt = DateTime.UtcNow
                    });

                    // Add showtime for Dark Knight in IMAX Hall
                    if (hour != 10) // Skip morning slot for IMAX
                    {
                        var darkKnightStart = date.AddHours(hour);
                        showtimes.Add(new Showtime
                        {
                            MovieId = movies[1].Id,
                            Movie = movies[1],
                            HallId = halls[1].Id,
                            Hall = halls[1],
                            StartTime = darkKnightStart,
                            EndTime = darkKnightStart.AddMinutes(movies[1].DurationMinutes),
                            CreatedAt = DateTime.UtcNow
                        });
                    }
                }
            }
            await context.Showtimes.AddRangeAsync(showtimes);
            await context.SaveChangesAsync();

            // Seed sample review
            var review = new Review
            {
                MovieId = movies[0].Id,
                UserId = customerUser.Id,
                Rating = 9,
                Comment = "Absolutely mind-blowing! One of the best sci-fi movies ever made.",
                CreatedAt = DateTime.UtcNow
            };
            await context.Reviews.AddAsync(review);
            await context.SaveChangesAsync();
        }
    }
}