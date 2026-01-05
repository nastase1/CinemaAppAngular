using CinemaApp.Application.Interfaces;
using CinemaApp.Shared.DTOs.Cinema;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CinemaController : ControllerBase
    {
        private readonly ICinemaService _cinemaService;

        public CinemaController(ICinemaService cinemaService)
        {
            _cinemaService = cinemaService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllCinemas()
        {
            var result = await _cinemaService.GetAllCinemasAsync();

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCinemaById(int id)
        {
            var result = await _cinemaService.GetCinemaByIdAsync(id);

            if (!result.Success)
                return NotFound(result);

            return Ok(result);
        }

        [HttpGet("{id}/halls")]
        [AllowAnonymous]
        public async Task<IActionResult> GetCinemaHalls(int id)
        {
            var result = await _cinemaService.GetCinemaHallsAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "2")] // Admin only
        public async Task<IActionResult> CreateCinema([FromBody] CreateCinemaDto createCinemaDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _cinemaService.CreateCinemaAsync(createCinemaDto);

            if (!result.Success)
                return BadRequest(result);

            return CreatedAtAction(nameof(GetCinemaById), new { id = result.Data }, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "2")] // Admin only
        public async Task<IActionResult> UpdateCinema(int id, [FromBody] CreateCinemaDto updateCinemaDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _cinemaService.UpdateCinemaAsync(id, updateCinemaDto);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "2")] // Admin only
        public async Task<IActionResult> DeleteCinema(int id)
        {
            var result = await _cinemaService.DeleteCinemaAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
