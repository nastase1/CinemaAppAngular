using CinemaApp.Application.Interfaces;
using CinemaApp.Shared.DTOs.Movie;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllMovies()
        {
            var result = await _movieService.GetAllMoviesAsync();

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var result = await _movieService.GetMovieByIdAsync(id);

            if (!result.Success)
                return NotFound(result);

            return Ok(result);
        }

        [HttpGet("now-showing")]
        [AllowAnonymous]
        public async Task<IActionResult> GetNowShowingMovies()
        {
            var result = await _movieService.GetNowShowingMoviesAsync();

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("coming-soon")]
        [AllowAnonymous]
        public async Task<IActionResult> GetComingSoonMovies()
        {
            var result = await _movieService.GetComingSoonMoviesAsync();

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest(new { Message = "Search query cannot be empty" });

            var result = await _movieService.SearchMoviesAsync(query);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "2")] // Admin only
        public async Task<IActionResult> CreateMovie([FromBody] CreateMovieDto createMovieDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _movieService.CreateMovieAsync(createMovieDto);

            if (!result.Success)
                return BadRequest(result);

            return CreatedAtAction(nameof(GetMovieById), new { id = result.Data }, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "2")] // Admin only
        public async Task<IActionResult> UpdateMovie(int id, [FromBody] CreateMovieDto updateMovieDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _movieService.UpdateMovieAsync(id, updateMovieDto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "2")] // Admin only
        public async Task<IActionResult> DeleteMovie(int id)
        {
            var result = await _movieService.DeleteMovieAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
