using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.Cinema;

namespace CinemaApp.Application.Services
{
    public class CinemaService : ICinemaService
    {
        private readonly IGenericRepository<Cinema> _cinemaRepo;

        public CinemaService(IGenericRepository<Cinema> cinemaRepo)
        {
            _cinemaRepo = cinemaRepo;
        }

        public async Task<ServiceResponse<List<CinemaDto>>> GetAllCinemasAsync()
        {
            var cinemas = await _cinemaRepo.GetAllAsync();
            var dtos = cinemas.Select(c => new CinemaDto
            {
                Id = c.Id,
                Name = c.Name,
                Location = c.Location
            }).ToList();

            return ServiceResponse<List<CinemaDto>>.Ok(dtos);
        }

        public async Task<ServiceResponse<int>> CreateCinemaAsync(CreateCinemaDto request)
        {
            var cinema = new Cinema
            {
                Name = request.Name,
                Location = request.Location
            };

            await _cinemaRepo.AddAsync(cinema);
            return ServiceResponse<int>.Ok(cinema.Id);
        }

        public async Task<ServiceResponse<CinemaDto>> GetCinemaByIdAsync(int id)
        {
            var cinema = await _cinemaRepo.GetByIdAsync(id);
            if (cinema == null)
                return ServiceResponse<CinemaDto>.Fail("Cinema not found.");

            var dto = new CinemaDto
            {
                Id = cinema.Id,
                Name = cinema.Name,
                Location = cinema.Location
            };

            return ServiceResponse<CinemaDto>.Ok(dto);
        }

        public async Task<ServiceResponse<object>> GetCinemaHallsAsync(int id)
        {
            var cinema = await _cinemaRepo.GetByIdAsync(id);
            if (cinema == null)
                return ServiceResponse<object>.Fail("Cinema not found.");

            var halls = cinema.Halls.Select(h => new
            {
                Id = h.Id,
                Name = h.Name,
                TotalSeats = h.Seats.Count
            });

            return ServiceResponse<object>.Ok(halls);
        }

        public async Task<ServiceResponse<bool>> UpdateCinemaAsync(int id, CreateCinemaDto updateCinemaDto)
        {
            var cinema = await _cinemaRepo.GetByIdAsync(id);
            if (cinema == null)
                return ServiceResponse<bool>.Fail("Cinema not found.");

            cinema.Name = updateCinemaDto.Name;
            cinema.Location = updateCinemaDto.Location;

            await _cinemaRepo.UpdateAsync(cinema);
            return ServiceResponse<bool>.Ok(true);
        }

        public async Task<ServiceResponse<bool>> DeleteCinemaAsync(int id)
        {
            var cinema = await _cinemaRepo.GetByIdAsync(id);
            if (cinema == null)
                return ServiceResponse<bool>.Fail("Cinema not found.");

            await _cinemaRepo.DeleteAsync(id);
            return ServiceResponse<bool>.Ok(true);
        }
    }
}