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
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Developer, User, Dietitian")]
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
                r.PrepTime = rec.PrepTime;
                r.Servings = rec.PrepTime;

                if (id == 0) _context.Recipe.Add(r);
                else _context.Recipe.Update(r);

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
        public async Task<IActionResult> getrecipe([FromQuery]int Id)
        {
            try
            {
                var recipe = _context.Recipe.Where(q => q.Id == Id).Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.Servings,
                    steps = d.RecipeStep.ToList(),
                    ingredients = d.RecipeIngredient.ToList(),

                    Url = _s3Service.GeneratePreSignedURL(_context.Document.Where(x => x.RefTable == "Recipe" && x.RefId == d.Id).FirstOrDefault().FilePath, 2),
                }).FirstOrDefault();
                return Content(JsonConvert.SerializeObject(recipe));
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
                var group = await _context.Group.FirstOrDefaultAsync(x => x.Id == groupId);
                var user = await _context.UserProfile.FirstOrDefaultAsync(x => x.Id == group.DieticianId);
                var recipe = _context.Recipe.Where(q => q.Id == recotw.RecipeId).Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.Servings,
                    steps = d.RecipeStep.ToList(),
                    Rating = d.UserFeedback.Count() > 0 ? d.UserFeedback.Sum(x => x.Rating) / d.UserFeedback.Count() : 0,
                    ingredients = d.RecipeIngredient.ToList(),
                    group.WeeklyStatement,
                    DietFName = user.FirstName,
                    DietLName = user.LastName,
                    PicFilePath = _s3Service.GeneratePreSignedURL(_context.Document.Where(x => x.RefTable == "Recipe" && x.RefId == d.Id).FirstOrDefault().FilePath, 2),
                }).FirstOrDefault();
                return Content(JsonConvert.SerializeObject(recipe));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getGroupRecipes")]
        public IActionResult getGroupRecipes([FromQuery]int groupId)
        {
            try
            {
                var recipes = _context.Recipe.Where(r => r.RecipeGroupRef.Any(x => x.GroupId == groupId)).Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.PrepTime,
                    g.Calories,
                    g.Servings,
                    rat = g.UserFeedback.Sum(x => x.Rating),
                    Counter = g.UserFeedback.Count(),
                    Rating = g.UserFeedback.Count() > 0 ? g.UserFeedback.Sum(x => x.Rating) / g.UserFeedback.Count() : 0,
                    Comments = g.UserFeedback.Where(u => u.RecipeId == g.Id).Select(x => new
                    {
                        x.Comment,
                        x.Rating,
                        x.Timestamp,
                        x.User.FirstName,
                        x.User.LastName,
                    }).ToList(),
                    Url = _s3Service.GeneratePreSignedURL(_context.Document.Where(x => x.RefId == g.Id).FirstOrDefault().FilePath, 2),
                    Ingredients = g.RecipeIngredient.ToList(),
                    Steps = g.RecipeStep.ToList()
                }).ToList();

                return Ok(JsonConvert.SerializeObject(recipes));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getComments")]
        public async Task<IActionResult> getComments([FromQuery]int groupId)
        {
            try
            {
                var recipes = _context.Recipe.Where(r => r.RecipeGroupRef.Any(x => x.GroupId == groupId)).Select(d => new
                {
                    d.Name,
                    Comments = d.UserFeedback.Where(u => u.RecipeId == d.Id).Select(x => new
                    {
                        x.Comment,
                        x.Rating,
                        x.Timestamp,
                        x.User.FirstName,
                        x.User.LastName,         
                    }).ToList(),
                    NumberOfComments = d.UserFeedback.Where(t => t.RecipeId == d.Id).Count()
                }).ToList();
                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(recipes));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        /// <summary>
        /// groupId is used to set a flag if the recipe is not in the group, still returns all recipes
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("getAllRecipes")]
        public async Task<IActionResult> getAllRecipes([FromQuery]int groupId)
        {
            try
            {
                var recipes = _context.Recipe.Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.PrepTime,
                    g.Calories,
                    g.Servings,
                    IsGroup = g.RecipeGroupRef.Any(x=> x.RecipeId == g.Id && x.GroupId == groupId)? true: false,
                    IsSpecial = g.RecipeGroupRef.Any(x => x.RecipeId == g.Id && x.GroupId == groupId && x.IsSpecial == true)? true: false,
                    Rating = g.UserFeedback.Count() > 0 ? g.UserFeedback.Sum(x => x.Rating) / g.UserFeedback.Count() : 0,
                    Url = _s3Service.GeneratePreSignedURL(_context.Document.Where(x => x.RefId == g.Id).FirstOrDefault().FilePath, 2),
                    Ingredients = g.RecipeIngredient.ToList(),
                    Steps = g.RecipeStep.ToList()
                }).ToList();

                return Ok(JsonConvert.SerializeObject(recipes));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

    }
}
