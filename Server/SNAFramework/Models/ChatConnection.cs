using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class ChatConnection
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int ConnectionOwnerId { get; set; }
        public bool IsConnected { get; set; }
        public bool IsSilent { get; set; }
        public DateTime? LastEnter { get; set; }
        public DateTime? LastLeave { get; set; }

        public UserProfile ConnectionOwner { get; set; }
        public Group Group { get; set; }
        public ChatConnection IdNavigation { get; set; }
        public ChatConnection InverseIdNavigation { get; set; }
    }
}
