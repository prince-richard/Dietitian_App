using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace SNAFramework.Models
{
    public partial class UserProfile
    {
        public UserProfile()
        {
            Group = new HashSet<Group>();
            MessageReciever = new HashSet<Message>();
            MessageSender = new HashSet<Message>();
            UserFeedback = new HashSet<UserFeedback>();
        }

        public int Id { get; set; }
        public string IdentityUserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public bool Inactive { get; set; }
        public string Email { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastModificationDate { get; set; }
        public int? LastModificationBy { get; set; }
        public int? GroupId { get; set; }
        public int? StatusId { get; set; }

        public Group GroupNavigation { get; set; }
        public IdentityUser IdentityUser { get; set; }
        public ICollection<Group> Group { get; set; }
        public ICollection<Message> MessageReciever { get; set; }
        public ICollection<Message> MessageSender { get; set; }
        public ICollection<UserFeedback> UserFeedback { get; set; }
    }
}
