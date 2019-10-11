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
using SNAFramework.Data;
using SNAFramework.Models;

namespace SNAFramework.Controllers
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
                    //d.RecipeId,
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


        
        [HttpGet]
        [Route("getrecipe")]
        public async Task<IActionResult> getrecipe([FromQuery]string id)
        {
            try
            {
                var recipeStep = _context.RecipeStep.Select(d => new
                {
                    d.Id,
                }).Where(q => q.Id.ToString().Equals(id)).FirstOrDefault();
                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(recipeStep));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        
    }
}
