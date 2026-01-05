using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CinemaApp.Application.Common
{
    public class ServiceResponse<T>
    {
        public T Data { get; set; }
        public bool Success { get; set; } = true;
        public string Message { get; set; } = string.Empty;

        public static ServiceResponse<T> Ok(T data) => new() { Data = data };
        public static ServiceResponse<T> Ok(T data, string message) => new() { Data = data, Message = message };
        public static ServiceResponse<T> Fail(string message) => new() { Success = false, Message = message };
    }
}