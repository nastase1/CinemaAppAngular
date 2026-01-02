using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Application.Interfaces;
using CinemaApp.Domain.Entities;
using CinemaApp.Domain.Interfaces;
using CinemaApp.Shared.DTOs.Review;

namespace CinemaApp.Application.Services
{
    public class ReviewService : IReviewService
    {
        private readonly IGenericRepository<Review> _reviewRepo;

        public ReviewService(IGenericRepository<Review> reviewRepo)
        {
            _reviewRepo = reviewRepo;
        }

        public async Task<ServiceResponse<ReviewDto>> AddReviewAsync(int userId, CreateReviewDto request)
        {

            var review = new Review
            {
                UserId = userId,
                MovieId = request.MovieId,
                Rating = request.Rating,
                Comment = request.Comment
            };
            await _reviewRepo.AddAsync(review);

            var responseDto = new ReviewDto
            {
                Id = review.Id,
                MovieId = review.MovieId,
                Rating = review.Rating,
                Comment = review.Comment,
                UserName = "You"
            };
            return ServiceResponse<ReviewDto>.Ok(responseDto);
        }
    }
}