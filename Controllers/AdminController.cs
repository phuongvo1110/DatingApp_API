using DatingApp.DTOs;
using DatingApp.Interfaces;
using DatingApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{
    public class AdminController(UserManager<AppUser> userManager, IUnitOfWork unitOfWork) : BaseApiController
    {
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("users-with-roles")]
        public async Task<ActionResult> GetUsersWithRoles()
        {
            var users = await userManager.Users.OrderBy(x => x.UserName).Select(x => new
            {
                x.Id,
                UserName = x.UserName,
                Roles = x.UserRoles.Select(r => r.Role.Name).ToList()
            }).ToListAsync();
            return Ok(users);
        }
        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("edit-roles/{username}")]
        public async Task<ActionResult> EditRoles(string username, string roles)
        {
            if (string.IsNullOrEmpty(roles)) return BadRequest("You must select at least one role");

            var selectedRoles = roles.Split(",").ToArray();

            var user = await userManager.FindByNameAsync(username);

            if (user == null) return BadRequest("User not found");
            var userRoles = await userManager.GetRolesAsync(user);
            var result = await userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if (!result.Succeeded) return BadRequest("Failed to add roles to user");
            result = await userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            if (!result.Succeeded) return BadRequest("Failed to remove from roles");
            return Ok(await userManager.GetRolesAsync(user));
        }
        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photos-for-approval")]
        public async Task<ActionResult> GetPhotosForApproval() 
        {
            var photos = await unitOfWork.PhotoRepository.GetUnapprovedPhotos();
            Console.WriteLine($"Photos count: {photos.Count()}");
            foreach (var photo in photos)
            {
                Console.WriteLine($"Photo: Id={photo.Id}, Url={photo.Url}, Username={photo.Username}, IsApproved={photo.IsApproved}");
            }
            return Ok(photos);
        }
        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("approve-photo/{photoId}")]
        public async Task<ActionResult> ApprovePhoto(int photoId)
        {
            var photo = await unitOfWork.PhotoRepository.GetPhotoById(photoId);
            var user = await unitOfWork.UserRepository.GetUserByPhotoId(photoId);
            if (photo == null) return BadRequest("Could not find the photo that you request");
            if (user == null) return BadRequest("The photo that you request does not belong to anyone");
            if (photo.IsApproved == true) return BadRequest("This photo is already approved");
            photo.IsApproved = true;
            if (!user.Photos.Any(p => p.IsMain == true)) photo.IsMain = true;
            await unitOfWork.Complete();
            return Ok();
        }
        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPost("reject-photo")]
        public async Task<ActionResult> RejectPhoto([FromBody] PhotoForApprovalDto photoForApprovalDto)
        {
            var photo = await unitOfWork.PhotoRepository.GetPhotoById(photoForApprovalDto.Id);
            if (photo == null) return BadRequest("Could not find the photo that you request");
            if (photo.IsApproved == false) return BadRequest("This photo is already rejected");
            photo.IsApproved = false;
            await unitOfWork.Complete();
            return Ok();
        }
    }
}
