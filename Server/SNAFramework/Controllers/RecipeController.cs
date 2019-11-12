using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Amazon.SimpleEmail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using DietitianApp.Data;
using DietitianApp.Models;
using Amazon.S3;
using DietitianApp.Services;

namespace DietitianApp.Controllers
{
    //Default security to only request with JWT Bearer Tokens
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Developer")]
    [Route("api/recipe")]
    public class RecipeController : SnaBaseController
    {
        public readonly S3Service _s3Service;

        public RecipeController(
            ApplicationDbContext context,
            IConfiguration configuration,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAmazonSimpleEmailService client,
            IAmazonS3 s3Client

            ) : base(context, configuration, roleManager, client, userManager, signInManager)
        {
            _s3Service = new S3Service(s3Client, _configuration);
        }

        [HttpGet("tests3")]
        public async Task<IActionResult> tests3()
        {
            try
            {
                var recipe = _context.Recipe.Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.PicFilePath

                }).Where(x => x.Id == 1);
                var docs = _context.Document.Where(x => x.RefTable == "Recipe" && x.RefId == 1)
                    .Select(x => new
                    {
                        x.Id,
                        x.FileName,
                        x.FilePath,
                        Url = _s3Service.GeneratePreSignedURL(x.FilePath, 2)
                    });
                var res = new
                {
                    recipe,
                    docs
                };
                return Ok(JsonConvert.SerializeObject(res));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }
        [HttpGet("allrecipes")]
        public async Task<IActionResult> allrecipes()
        {
            try
            {
                var recipes = _context.Recipe.Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.PicFilePath,

                });
                return Ok(JsonConvert.SerializeObject(recipes));

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }


        [HttpPut]
        [Route("updaterecipe")]
        public async Task<IActionResult> updaterecipe([FromBody] Recipe rec)
        {
            try
            {
                int id = rec.Id;
                Recipe r = new Recipe();
                if (id > 0) r = _context.Recipe.SingleOrDefault(x => x.Id == rec.Id);

                r.Name = rec.Name;
                r.Calories = rec.Calories;
                //.....
                if (id == 0) _context.Recipe.Add(r);

                _context.SaveChanges();

                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(r));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        [HttpGet]
        [Route("getrecipe")]
        public async Task<IActionResult> getrecipe([FromQuery]string id)
        {
            try
            {

                int Id = int.Parse(id);
                var recipe = _context.Recipe.Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.Servings,
                    steps = d.RecipeStep.ToList(),
                    ingredients = d.RecipeIngredient.ToList()
                }).Where(q => q.Id == Id).FirstOrDefault();
                var docs = _context.Document.Where(x => x.RefTable == "Recipe" && x.RefId == Id)
                    .Select(x => new
                    {
                        x.Id,
                        x.FileName,
                        x.FilePath,
                        Url = _s3Service.GeneratePreSignedURL(x.FilePath, 2)
                    }).ToList();
                var rec = new
                {
                    Id = recipe.Id,
                    recipe.Name,
                    recipe.Calories,
                    recipe.PrepTime,
                    recipe.Servings,
                    steps = recipe.steps,
                    ingredients = recipe.ingredients,
                    URL = docs[0].Url

                };
                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(rec));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getrecipeofweek")]
        public async Task<IActionResult> getrecipeofweek([FromQuery]int groupId)
        {
            try
            {
                var recotw = _context.RecipeGroupRef.Where(x => x.GroupId == groupId && x.IsSpecial == true).SingleOrDefault();
                var recipe = _context.Recipe.Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.Servings,
                    steps = d.RecipeStep.ToList(),
                    ingredients = d.RecipeIngredient.ToList()
                }).Where(q => q.Id == recotw.RecipeId).FirstOrDefault();

                var docs = _context.Document.Where(x => x.RefTable == "Recipe" && x.RefId == recotw.RecipeId)
                    .Select(x => new
                    {
                        x.Id,
                        x.FileName,
                        x.FilePath,
                        Url = _s3Service.GeneratePreSignedURL(x.FilePath, 2)
                    }).ToList();
                var rec = new
                {
                    Id = recipe.Id,
                    recipe.Name,
                    recipe.Calories,
                    recipe.PrepTime,
                    recipe.Servings,
                    Steps = recipe.steps,
                    Ingredients = recipe.ingredients,
                    PicFilePath = docs[0].Url

                };
                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(rec));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [Route("getRecipeOfTheWeek")]
        public async Task<IActionResult> getRecipeOfTheWeek([FromQuery]string groupId)
        {
            try
            {
                var recipeId = _context.RecipeGroupRef.Where(s => s.GroupId.ToString().Equals(groupId) && s.IsSpecial == true)
                    .Select(g => g.RecipeId).FirstOrDefault();

                var WeeklyStatement = _context.Group.Where(g => g.Id.ToString().Equals(groupId))
                    .Select(w => w.WeeklyStatement).FirstOrDefault();

                var recipe = _context.Recipe.Where(s => s.Id.ToString().Equals(recipeId.ToString()))
                    .Select(g => new
                    {
                        g.Id,
                        g.Name,
                        g.PrepTime,
                        g.Calories,
                        g.Servings,
                        Rating = g.UserFeedback.Where(f => f.RecipeId.ToString().Equals(recipeId.ToString()))
                            .Select(x => x.Rating).FirstOrDefault(),
                        WeeklyStatement
                    }).FirstOrDefault();

                return Ok(JsonConvert.SerializeObject(recipe));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getGroupRecipes")]
        public async Task<IActionResult> getGroupRecipes([FromQuery]string groupId)
        {
            try
            {
                var recipes = _context.RecipeGroupRef
                    .Where(s => s.GroupId.ToString().Equals(groupId))
                    .Select(r => new
                    {
                        RecipeInfo = _context.Recipe.Where(q => q.Id == r.RecipeId).Select(g => new
                        {
                            g.Id,
                            g.Name,
                            g.PrepTime,
                            g.Calories,
                            g.Servings,
                            Rating = g.UserFeedback.Select(x => x.Rating)
                                                    .FirstOrDefault(),
                            Ingredients = g.RecipeIngredient.ToList(),
                            Steps = g.RecipeStep.ToList()
                        })
                    });
                                                    
                return Ok(JsonConvert.SerializeObject(recipes));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
