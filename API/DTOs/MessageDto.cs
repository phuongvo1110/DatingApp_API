﻿using DatingApp.Models;

namespace DatingApp.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        public required string SenderUsername { get; set; }
        public required string SenderPhotoUrl { get; set; }
        public required string RecipientPhotoUrl { get; set; }
        public required string RecipientUsername { get; set; }
        public required string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.UtcNow;
        public int SenderId { get; set; }
        public int RecipientId { get; set; }
    }
}
