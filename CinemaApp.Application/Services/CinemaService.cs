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
    public class CinemaService: ICinemaService
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
    }
}