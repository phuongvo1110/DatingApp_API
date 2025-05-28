using System.ComponentModel.DataAnnotations.Schema;

namespace DatingApp.Models
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public bool IsMain { get; set; }
        public string? PublicId { get; set; }
        //Navigation Properties
        public int AppUserId { get; set; }
        public bool IsApproved { get; set; } = false;
        public AppUser AppUser { get; set; } = null!;
    }
}
