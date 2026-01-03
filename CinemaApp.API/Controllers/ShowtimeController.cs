using CinemaApp.Application.Interfaces;
using CinemaApp.Shared.DTOs.Showtime;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShowtimeController : ControllerBase
    {
        private readonly IShowtimeService _showtimeService;

        public ShowtimeController(IShowtimeService showtimeService)
        {
            _showtimeService = showtimeService;
        }

        [HttpGet("movie/{movieId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetShowtimesByMovie(int movieId)
        {
            var result = await _showtimeService.GetShowtimesByMovieIdAsync(movieId);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetShowtimeById(int id)
        {
            var result = await _showtimeService.GetShowtimeByIdAsync(id);

            if (!result.Success)
                return NotFound(result);

            return Ok(result);
        }

        [HttpGet("{id}/available-seats")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAvailableSeats(int id)
        {
            var result = await _showtimeService.GetAvailableSeatsAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("cinema/{cinemaId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetShowtimesByCinema(int cinemaId, [FromQuery] DateTime? date = null)
        {
            var result = await _showtimeService.GetShowtimesByCinemaAsync(cinemaId, date);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "1")] // Admin only
        public async Task<IActionResult> CreateShowtime([FromBody] CreateShowtimeDto createShowtimeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _showtimeService.CreateShowtimeAsync(createShowtimeDto);

            if (!result.Success)
                return BadRequest(result);

            return CreatedAtAction(nameof(GetShowtimeById), new { id = result.Data }, result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "1")] // Admin only
        public async Task<IActionResult> DeleteShowtime(int id)
        {
            var result = await _showtimeService.DeleteShowtimeAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
