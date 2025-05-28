using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }
        [Required]
        [MinLength(8)]
        public required string Password { get; set; }
        public required string KnownAs { get; set; }
        public required string Gender { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public required DateOnly DateOfBirth { get; set; }
    }
}
