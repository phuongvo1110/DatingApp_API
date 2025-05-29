using DatingApp.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace DatingApp.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;
            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);
            if (users == null) return;
            var roles = new List<AppRole>
            {
                new()
                {
                    Name = "Member"
                },
                new()
                {
                    Name = "Admin"
                },
                new()
                {
                    Name = "Moderator"
                },
            };
            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            foreach (var user in users)
            {
                user.UserName = user.UserName!.ToLower();
                user.Photos.First().IsApproved = true;
                await userManager.CreateAsync(user, "123456aA@");
                await userManager.AddToRoleAsync(user, "Member");
            }
            var admin = new AppUser
            {
                UserName = "admin",
                KnownAs = "Admin",
                Gender = "",
                City = "",
                Country = ""
            };
            await userManager.CreateAsync(admin, "123456aA@");
            await userManager.AddToRolesAsync(admin, ["Admin", "Moderator"]);
        }
    }
}
