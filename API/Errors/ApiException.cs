﻿namespace DatingApp.Errors
{
    public class ApiException(int statusCode, string message, string? detail)
    {
        public int StatusCode { get; set; } = statusCode;
        public string Message { get; set; } = message;
        public string? Details { get; set; } = detail;
    }
}
