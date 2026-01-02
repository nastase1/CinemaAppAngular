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
                DurationMinutes = m.DurationMinutes,
                PosterUrl = m.PosterUrl,
                TrailerUrl = m.TrailerUrl,
                Rating = m.Rating
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
                DurationMinutes = movie.DurationMinutes,
                ReleaseDate = movie.ReleaseDate,
                Rating = movie.Rating,
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
                DurationMinutes = request.DurationMinutes,
                ReleaseDate = request.ReleaseDate,
                PosterUrl = request.PosterUrl,
                TrailerUrl = request.TrailerUrl,
                Rating = 0.0
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
    }
}