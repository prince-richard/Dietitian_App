﻿using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class Group
    {
        public Group()
        {
            ChatConnection = new HashSet<ChatConnection>();
            Message = new HashSet<Message>();
            RecipeGroupRef = new HashSet<RecipeGroupRef>();
            UserProfile = new HashSet<UserProfile>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int DieticianId { get; set; }
        public string WeeklyStatement { get; set; }

        public UserProfile Dietician { get; set; }
        public ICollection<ChatConnection> ChatConnection { get; set; }
        public ICollection<Message> Message { get; set; }
        public ICollection<RecipeGroupRef> RecipeGroupRef { get; set; }
        public ICollection<UserProfile> UserProfile { get; set; }
    }
}
