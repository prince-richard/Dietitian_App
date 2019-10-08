using System;
using System.Collections.Generic;

namespace SNAFramework.Models
{
    public partial class Recipe
    {
        public Recipe()
        {
            RecipeGroupRef = new HashSet<RecipeGroupRef>();
            RecipeIngredient = new HashSet<RecipeIngredient>();
            RecipeStep = new HashSet<RecipeStep>();
            UserFeedback = new HashSet<UserFeedback>();
        }

        public int RecipeId { get; set; }
        public string Name { get; set; }
        public string PicFilePath { get; set; }
        public int? Calories { get; set; }
        public int? PrepTime { get; set; }

        public ICollection<RecipeGroupRef> RecipeGroupRef { get; set; }
        public ICollection<RecipeIngredient> RecipeIngredient { get; set; }
        public ICollection<RecipeStep> RecipeStep { get; set; }
        public ICollection<UserFeedback> UserFeedback { get; set; }
    }
}
