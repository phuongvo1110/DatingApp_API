using System.ComponentModel.DataAnnotations;

namespace DatingApp.DTOs
{
    public class LoginDto
    {
        [Required]
        [MaxLength(100)]
        public string UserName { get; set; }
        [Required]
        [MinLength(8)]
        public required string Password { get; set; }
    }
}
