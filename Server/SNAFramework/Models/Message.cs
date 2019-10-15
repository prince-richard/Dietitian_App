using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public int RecieverId { get; set; }
        public int GroupId { get; set; }
        public DateTime Timestamp { get; set; }
        public string Contents { get; set; }

        public Group Group { get; set; }
        public UserProfile Reciever { get; set; }
        public UserProfile Sender { get; set; }
    }
}
