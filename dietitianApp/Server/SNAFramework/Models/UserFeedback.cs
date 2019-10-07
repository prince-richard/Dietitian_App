using System;
using System.Collections.Generic;

namespace SNAFramework.Models
{
    public partial class UserFeedback
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public int UserId { get; set; }
        public short? Rating { get; set; }
        public string Comment { get; set; }
        public DateTime Timestamp { get; set; }

        public Recipe Recipe { get; set; }
        public UserProfile User { get; set; }
    }
}
