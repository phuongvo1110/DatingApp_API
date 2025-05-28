using DatingApp.Models;

namespace DatingApp.Interfaces
{
    public interface ITokenService
    {
        Task<String> CreateToken(AppUser user);
    }
}
