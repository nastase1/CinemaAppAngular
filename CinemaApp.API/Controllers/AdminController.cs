using CinemaApp.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CinemaApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "1")] // Admin only
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMovieService _movieService;
        private readonly IBookingService _bookingService;
        private readonly ICinemaService _cinemaService;

        public AdminController(
            IUserService userService,
            IMovieService movieService,
            IBookingService bookingService,
            ICinemaService cinemaService)
        {
            _userService = userService;
            _movieService = movieService;
            _bookingService = bookingService;
            _cinemaService = cinemaService;
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var usersResult = await _userService.GetAllUsersAsync();
            var moviesResult = await _movieService.GetAllMoviesAsync();
            var bookingsResult = await _bookingService.GetAllBookingsAsync();
            var cinemasResult = await _cinemaService.GetAllCinemasAsync();

            return Ok(new
            {
                TotalUsers = usersResult.Success ? usersResult.Data.Count() : 0,
                TotalMovies = moviesResult.Success ? moviesResult.Data.Count() : 0,
                TotalBookings = bookingsResult.Success ? bookingsResult.Data.Count() : 0,
                TotalCinemas = cinemasResult.Success ? cinemasResult.Data.Count() : 0,
                Timestamp = DateTime.UtcNow
            });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var result = await _userService.GetAllUsersAsync();

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> GetAllBookings()
        {
            var result = await _bookingService.GetAllBookingsAsync();

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteUserAsync(id);

            if (!result.Success)
                return BadRequest(result);

            return Ok(result);
        }
    }
}
