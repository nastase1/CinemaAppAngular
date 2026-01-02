using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Shared.DTOs.Review
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public string UserName { get; set; } = string.Empty; 
        
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
    
}