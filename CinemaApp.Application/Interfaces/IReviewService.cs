using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Common;
using CinemaApp.Shared.DTOs.Review;

namespace CinemaApp.Application.Interfaces
{
    public interface IReviewService
    {
        Task<ServiceResponse<ReviewDto>> AddReviewAsync(int userId, CreateReviewDto request);
    }
}