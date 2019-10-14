using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class RecipeGroupRef
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public int GroupId { get; set; }
        public bool? IsSpecial { get; set; }

        public Group Group { get; set; }
        public Recipe Recipe { get; set; }
    }
}
