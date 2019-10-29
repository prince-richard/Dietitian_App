using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class Group
    {
        public Group()
        {
            Message = new HashSet<Message>();
            RecipeGroupRef = new HashSet<RecipeGroupRef>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int DieticianId { get; set; }

        public UserProfile Dietician { get; set; }
        public ICollection<Message> Message { get; set; }
        public ICollection<RecipeGroupRef> RecipeGroupRef { get; set; }
        public ICollection<UserProfile> UserProfile { get; set; }
    }
}
