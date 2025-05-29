using DatingApp.DTOs;
using DatingApp.Helpers;
using DatingApp.Models;

namespace DatingApp.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<AppUser?> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetUserAsync();
        Task<AppUser?> GetUserByIdAsync(int id);
        Task<AppUser?> GetUserByPhotoId(int id);
        Task<MemberDto?> GetMemberAsync(string username, bool isCurrentUser);
        Task<PageList<MemberDto>> GetMembersAsync(UserParams userParams);
    }
}
