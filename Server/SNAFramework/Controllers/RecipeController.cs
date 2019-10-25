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

namespace DietitianApp.Controllers
{
    //Default security to only request with JWT Bearer Tokens
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Developer")]
    [Route("api/recipe")]
    public class RecipeController : SnaBaseController
    {
        public RecipeController(
            ApplicationDbContext context,
            IConfiguration configuration,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAmazonSimpleEmailService client

            ) : base(context, configuration, roleManager, client, userManager, signInManager)
        {

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
                    d.PicFilePath,
                    d.Calories,
                    d.PrepTime,
                    d.Servings,
                    steps = d.RecipeStep.ToList(),
                    ingredients = d.RecipeIngredient.ToList()
                }).Where(q => q.Id == Id).FirstOrDefault();
                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(recipe));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
    }
}
