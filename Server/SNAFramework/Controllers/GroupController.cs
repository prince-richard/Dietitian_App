﻿using System;
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
                    DietitianName = d.Dietician.FirstName + " " + d.Dietician.LastName,
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

        [HttpGet]
        [Route("getdietitiangroups")]
        public async Task<IActionResult> getdietitiangroups()
        {
            try
            {
                var dietitianGroups = _context.UserProfile.Join(
                    _context.Group,
                    u => u.Id,
                    g => g.DieticianId,
                    (u, g) => new
                    {
                        dietitianName = u.FirstName + " " + u.LastName,
                        group = g.Id,

                    });

                return Ok(JsonConvert.SerializeObject(dietitianGroups));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        [HttpGet]
        [Route("getGroupPatients")]
        public async Task<IActionResult> getGroupPatients([FromQuery] string groupId)
        {
            try
            {
                var patients = _context.UserProfile.Where(q => q.GroupId.ToString().Equals(groupId))
                                                   .Select(d => new
                                                   {
                                                       d.FirstName,
                                                       d.LastName,
                                                       d.Email,
                                                       TimeSinceLastPost = d.UserFeedback.Select(x => new
                                                       {
                                                           TimeSince = DateTime.Now.Subtract(x.Timestamp)
                                                       })
                                                   
                });

                return Ok(JsonConvert.SerializeObject(patients));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
