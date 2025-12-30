using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CinemaApp.Domain.Entities;

namespace CinemaApp.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}