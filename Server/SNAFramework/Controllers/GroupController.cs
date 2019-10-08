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
    [Route("api/group")]
    public class GroupController : SnaBaseController
    {
        public GroupController(
            ApplicationDbContext context,
            IConfiguration configuration,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAmazonSimpleEmailService client

            ) : base(context, configuration, roleManager, client, userManager, signInManager)
        {

        }

        [HttpGet("allgroups")]
        public async Task<IActionResult> allgroups()
        {
            try
            {
                var users = _context.Group.Select(d => new
                {
                    d.Id,
                    d.DieticianId,
                    d.Name,
                    Users = d.UserProfile.Where(u => u.GroupId == d.Id).Select(x => new
                    {
                        x.Id,
                        x.FirstName
                    }).ToList()

                }).ToList();
                return Ok(JsonConvert.SerializeObject(users));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }

        }

        [HttpGet]
        [Route("getgroup")]
        public async Task<IActionResult> getgroup([FromQuery]string id)
        {
            try
            {
                var user = _context.UserProfile.Select(d => new
                {
                    d.CreatedDate,
                    d.Id,
                    d.FirstName,
                    d.LastName,
                    d.Email,
                    d.PhoneNumber,
                }).Where(q => q.Id.ToString().Equals(id)).FirstOrDefault();
                return Content(Newtonsoft.Json.JsonConvert.SerializeObject(user));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
