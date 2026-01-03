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

        public async Task<ServiceResponse<IEnumerable<ReviewDto>>> GetMovieReviewsAsync(int movieId)
        {
            var reviews = await _reviewRepo.GetAllAsync();
            var movieReviews = reviews.Where(r => r.MovieId == movieId)
                .Select(r => new ReviewDto
                {
                    Id = r.Id,
                    MovieId = r.MovieId,
                    Rating = r.Rating,
                    Comment = r.Comment,
                    UserName = r.User != null ? $"{r.User.FirstName} {r.User.LastName}" : "Anonymous"
                });

            return ServiceResponse<IEnumerable<ReviewDto>>.Ok(movieReviews);
        }

        public async Task<ServiceResponse<ReviewDto>> CreateReviewAsync(int userId, CreateReviewDto request)
        {
            return await AddReviewAsync(userId, request);
        }

        public async Task<ServiceResponse<bool>> DeleteReviewAsync(int reviewId, int userId)
        {
            var review = await _reviewRepo.GetByIdAsync(reviewId);
            if (review == null)
                return ServiceResponse<bool>.Fail("Review not found.");

            if (review.UserId != userId)
                return ServiceResponse<bool>.Fail("You can only delete your own reviews.");

            await _reviewRepo.DeleteAsync(reviewId);
            return ServiceResponse<bool>.Ok(true);
        }
    }
}