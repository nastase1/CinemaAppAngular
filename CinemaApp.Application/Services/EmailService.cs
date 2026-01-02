using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Application.Interfaces;
using Microsoft.Extensions.Logging;

namespace CinemaApp.Application.Services
{
    public class EmailService : IEmailService
    {
        private readonly ILogger<EmailService> _logger;

        public EmailService(ILogger<EmailService> logger)
        {
            _logger = logger;
        }

        public async Task SendBookingConfirmationAsync(string toEmail, int bookingId)
        {
            _logger.LogInformation($"[Email Sent] To: {toEmail}, Subject: Booking Confirmed #{bookingId}");
            await Task.CompletedTask;
        }
    }
}