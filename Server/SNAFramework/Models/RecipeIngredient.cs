using System;
using System.Collections.Generic;

namespace DietitianApp.Models
{
    public partial class RecipeIngredient
    {
        public int Id { get; set; }
        public int RecipeId { get; set; }
        public string Description { get; set; }

        public Recipe Recipe { get; set; }
    }
}
