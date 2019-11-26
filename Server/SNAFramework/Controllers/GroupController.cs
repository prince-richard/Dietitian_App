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
using Amazon.S3;
using DietitianApp.Models;
using DietitianApp.Services;

namespace DietitianApp.Controllers
{
    //Default security to only request with JWT Bearer Tokens
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Developer, User, Dietitian")]
    [Route("api/group")]
    public class GroupController : SnaBaseController
    {
        public readonly S3Service _s3Service;

        public GroupController(
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

        /// <summary>
        /// returns all of the groups
        /// </summary>
        /// <returns>group list</returns>
        [HttpGet("allgroups")]
        public IActionResult allgroups()
        {
            try
            {
                var groups = _context.Group.Select(d => new
                {
                    d.Id,
                    d.DieticianId,
                    DietitianName = d.Dietician.FirstName + " " + d.Dietician.LastName,
                    d.Name,
                    Users = d.UserProfile.Where(u => u.GroupId == d.Id).Select(x => new
                    {
                        x.Id,
                        x.FirstName
                    }).ToList()

                }).ToList();
                return Ok(JsonConvert.SerializeObject(groups));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }

        }

        [HttpGet("getgroup")]
        public async Task<IActionResult> getgroup([FromQuery]int Id)
        {
            try
            {
                var group = _context.Group.Where(q => q.Id == Id).Select(d => new
                {
                    d.Id,
                    d.DieticianId,
                    DietitianName = d.Dietician.FirstName + " " + d.Dietician.LastName,
                    d.Name,
                    Users = d.UserProfile.Where(u => u.GroupId == d.Id && d.Id != d.DieticianId && u.StatusId == 2).Select(x => new
                    {
                        x.Id,
                        x.FirstName
                    }).ToList()
                }).SingleOrDefault();

                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(group));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }

        }
        [HttpGet]
        [Route("getGroupPatients")]
        public async Task<IActionResult> getGroupPatients([FromQuery] int groupId)
        {
            try
            {
                var patients = _context.UserProfile.Where(q => q.GroupId == groupId && q.StatusId==2).Select(d => new
                {
                    d.Id,
                    d.FirstName,
                    d.LastName,
                    d.Email,
                    TimeSinceLastPost = d.UserFeedback.Max(x => x.Timestamp) == null ? "No Comment Yet" : DateTime.Now.Subtract(d.UserFeedback.Max(x => x.Timestamp)).ToString()
                });
                
                return Ok(JsonConvert.SerializeObject(patients));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


        //update group
        [HttpPut]
        [Route("updategroup")]
        public async Task<IActionResult> updategroup([FromBody] Group grp)
        {
            try
            {
                int id = grp.Id;
                Group g = new Group();
                if (id > 0) g = _context.Group.SingleOrDefault(x => x.Id == grp.Id);

                g.Name = grp.Name;
                //.....
                if (id == 0) _context.Group.Add(g);

                _context.SaveChanges();

                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(g));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpPut]
        [Route("updateWeeklyStatement/{groupId}/{message}")]
        public async Task<IActionResult> updateWeeklyStatement([FromRoute] int groupId, [FromRoute] string message)
        {
            try
            {
                var group = await _context.Group.FirstOrDefaultAsync(x => x.Id == groupId);
                group.WeeklyStatement = message;

                _context.SaveChanges();

                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(group));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet]
        [Route("getDietHomePage")]
        public async Task<IActionResult> getDietHomePage([FromQuery] int groupId)
        {
            try
            {
                var group = await _context.Group.FirstOrDefaultAsync(x => x.Id == groupId);
                var dietId = group.DieticianId;
                var user = await _context.UserProfile.FirstOrDefaultAsync(x => x.Id == dietId);
                var PatientCount =  _context.UserProfile.Where(x => x.GroupId == groupId && x.StatusId == 2).Count();
                var RequestCount = _context.UserProfile.Where(x => x.GroupId == groupId && x.StatusId == 1).Count();
                var RecipeCount = _context.RecipeGroupRef.Where(x => x.GroupId == groupId).Count();
                var recotw = _context.RecipeGroupRef.Where(x => x.GroupId == groupId && x.IsSpecial == true).SingleOrDefault();
                var recipe = _context.Recipe.Select(d => new
                {
                    d.Id,
                    d.Name,
                    d.Calories,
                    d.PrepTime,
                    d.Servings,
                    steps = d.RecipeStep.ToList(),
                    rating = d.UserFeedback.Sum(x => x.Rating),
                    counter = d.UserFeedback.Count(),
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
                var homePage = new
                {
                    recipe.Id,
                    recipe.Name,
                    recipe.Calories,
                    recipe.PrepTime,
                    recipe.Servings,
                    Steps = recipe.steps,
                    Ingredients = recipe.ingredients,
                    Rating = recipe.counter > 0 ? recipe.rating / recipe.counter : 0,
                    PicFilePath = docs[0].Url,
                    group.WeeklyStatement,
                    DietFName = user.FirstName,
                    DietLName = user.LastName,
                    PatientCount,
                    RequestCount,
                    RecipeCount,

                };
                return Ok(JsonConvert.SerializeObject(homePage));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getRequests")]
        public async Task<IActionResult> getRequests([FromQuery] int groupId)
        {
            try
            {
                var requests = _context.UserProfile.Where(q => q.GroupId == groupId && q.StatusId == 1)
                                                   .Select(u => new { u.FirstName, u.Id, u.LastName, u.Email })
                                                   .ToList();

                return Ok(JsonConvert.SerializeObject(requests));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut]
        [Route("updateRequestStatus/{userId}/{statusId}")]
        public async Task<IActionResult> updateRequestStatus([FromRoute] int statusId, [FromRoute] int userId)
        {
            try
            {
                var userprofile = await _context.UserProfile.FirstOrDefaultAsync(x => x.Id == userId);
                if(statusId == 0)
                {
                    userprofile.StatusId = 0;
                    userprofile.GroupId = null;
                }
                else
                {
                    userprofile.StatusId = 2;
                }
                _context.UserProfile.Update(userprofile);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut]
        [Route("leaveGroup/{userId}")]
        public async Task<IActionResult> leaveGroup([FromRoute] int userId)
        {
            try
            {
                var userprofile = await _context.UserProfile.FirstOrDefaultAsync(x => x.Id == userId);
                userprofile.StatusId = 0;
                userprofile.GroupId = null;
                _context.UserProfile.Update(userprofile);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpPut]
        [Route("requestGroup/{userId}/{groupId}")]
        public async Task<IActionResult> requestGroup([FromRoute] int groupId, [FromRoute] int userId)
        {
            try
            {
                var userprofile = await _context.UserProfile.FirstOrDefaultAsync(x => x.Id == userId);
                userprofile.StatusId = 1;
                userprofile.GroupId = groupId;
                _context.UserProfile.Update(userprofile);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
        [HttpGet]
        [Route("getDieticians")]
        public async Task<IActionResult> getDieticians()
        {
            try
            {
                var dieticians = _context.Group.Select(d => new
                {
                    d.Id,
                    Name = d.Dietician.FirstName + " " + d.Dietician.LastName,
                }).ToList();
                return Ok(JsonConvert.SerializeObject(dieticians));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getDietitian")]
        public async Task<IActionResult> getDietitian([FromQuery]string groupId)
        {
            try
            {
                var name = _context.Group.Where(g => g.Id.ToString().Equals(groupId)).Select(s => new
                {
                    s.Dietician.FirstName,
                    s.Dietician.LastName

                }).SingleOrDefault();
                return Ok(JsonConvert.SerializeObject(name));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }


    }
}
