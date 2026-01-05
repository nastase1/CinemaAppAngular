using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.Movie;

namespace CinemaApp.Application.Services
{
    public class MovieService : IMovieService
    {
        private readonly IGenericRepository<Movie> _movieRepo;

        public MovieService(IGenericRepository<Movie> movieRepo)
        {
            _movieRepo = movieRepo;
        }

        public async Task<ServiceResponse<List<MovieDetailsDto>>> GetAllMoviesAsync()
        {
            var movies = await _movieRepo.GetAllAsync();
            var dtos = movies.Select(m => new MovieDetailsDto
            {
                Id = m.Id,
                Title = m.Title,
                Genres = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                DurationMinutes = m.Duration,
                PosterUrl = m.PosterUrl,
                TrailerUrl = m.TrailerUrl,
                Rating = (double)m.Rating
            }).ToList();
            return ServiceResponse<List<MovieDetailsDto>>.Ok(dtos);
        }

        public async Task<ServiceResponse<MovieDetailsDto>> GetMovieByIdAsync(int id)
        {
            var movie = await _movieRepo.GetByIdAsync(id);
            if (movie == null) return ServiceResponse<MovieDetailsDto>.Fail("Movie not found.");

            var dto = new MovieDetailsDto
            {
                Id = movie.Id,
                Title = movie.Title,
                Description = movie.Description,
                DurationMinutes = movie.Duration,
                ReleaseDate = movie.ReleaseDate,
                Rating = (double)movie.Rating,
                PosterUrl = movie.PosterUrl,
                TrailerUrl = movie.TrailerUrl,
                Genres = movie.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                Cast = movie.MovieActors.Select(ma => ma.Actor.LastName).ToList(),
                Directors = movie.MovieDirectors.Select(md => md.Director.LastName).ToList()
            };

            return ServiceResponse<MovieDetailsDto>.Ok(dto);
        }

        public async Task<ServiceResponse<int>> CreateMovieAsync(CreateMovieDto request)
        {
            var movie = new Movie
            {
                Title = request.Title,
                Description = request.Description,
                Duration = request.DurationMinutes,
                ReleaseDate = request.ReleaseDate,
                PosterUrl = request.PosterUrl,
                TrailerUrl = request.TrailerUrl,
                Rating = 0.0M
            };

            foreach (var genreId in request.GenreIds)
            {
                movie.MovieGenres.Add(new MovieGenre
                {
                    GenreId = genreId
                });
            }

            foreach (var actorId in request.ActorIds)
            {
                movie.MovieActors.Add(new MovieActor
                {
                    ActorId = actorId
                });
            }


            foreach (var directorId in request.DirectorIds)
            {
                movie.MovieDirectors.Add(new MovieDirector
                {
                    DirectorId = directorId
                });
            }


            await _movieRepo.AddAsync(movie);
            return ServiceResponse<int>.Ok(movie.Id);
        }

        public async Task<ServiceResponse<List<MovieDetailsDto>>> GetNowShowingMoviesAsync()
        {
            var movies = await _movieRepo.GetAllAsync();
            var now = DateTime.UtcNow;
            var nowShowing = movies.Where(m => m.ReleaseDate <= now.AddMonths(1) && m.ReleaseDate >= now.AddMonths(-3))
                .Select(m => new MovieDetailsDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Genres = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                    DurationMinutes = m.Duration,
                    PosterUrl = m.PosterUrl,
                    TrailerUrl = m.TrailerUrl,
                    Rating = (double)m.Rating,
                    ReleaseDate = m.ReleaseDate
                }).ToList();
            return ServiceResponse<List<MovieDetailsDto>>.Ok(nowShowing);
        }

        public async Task<ServiceResponse<List<MovieDetailsDto>>> GetComingSoonMoviesAsync()
        {
            var movies = await _movieRepo.GetAllAsync();
            var now = DateTime.UtcNow;
            var comingSoon = movies.Where(m => m.ReleaseDate > now)
                .Select(m => new MovieDetailsDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Genres = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                    DurationMinutes = m.Duration,
                    PosterUrl = m.PosterUrl,
                    TrailerUrl = m.TrailerUrl,
                    Rating = (double)m.Rating,
                    ReleaseDate = m.ReleaseDate
                }).ToList();
            return ServiceResponse<List<MovieDetailsDto>>.Ok(comingSoon);
        }

        public async Task<ServiceResponse<List<MovieDetailsDto>>> SearchMoviesAsync(string query)
        {
            var movies = await _movieRepo.GetAllAsync();
            var searchResults = movies.Where(m => m.Title.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                                                   m.Description.Contains(query, StringComparison.OrdinalIgnoreCase))
                .Select(m => new MovieDetailsDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Genres = m.MovieGenres.Select(mg => mg.Genre.Name).ToList(),
                    DurationMinutes = m.Duration,
                    PosterUrl = m.PosterUrl,
                    TrailerUrl = m.TrailerUrl,
                    Rating = (double)m.Rating,
                    ReleaseDate = m.ReleaseDate
                }).ToList();
            return ServiceResponse<List<MovieDetailsDto>>.Ok(searchResults);
        }

        public async Task<ServiceResponse<bool>> UpdateMovieAsync(int id, CreateMovieDto updateMovieDto)
        {
            var movie = await _movieRepo.GetByIdAsync(id);
            if (movie == null) return ServiceResponse<bool>.Fail("Movie not found.");

            movie.Title = updateMovieDto.Title;
            movie.Description = updateMovieDto.Description;
            movie.Duration = updateMovieDto.DurationMinutes;
            movie.ReleaseDate = updateMovieDto.ReleaseDate;
            movie.PosterUrl = updateMovieDto.PosterUrl;
            movie.TrailerUrl = updateMovieDto.TrailerUrl;

            await _movieRepo.UpdateAsync(movie);
            return ServiceResponse<bool>.Ok(true);
        }

        public async Task<ServiceResponse<bool>> DeleteMovieAsync(int id)
        {
            var movie = await _movieRepo.GetByIdAsync(id);
            if (movie == null) return ServiceResponse<bool>.Fail("Movie not found.");

            await _movieRepo.DeleteAsync(id);
            return ServiceResponse<bool>.Ok(true);
        }
    }
}