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
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "Developer")]
    [Route("api/message")]
    public class MessageController : SnaBaseController
    {
        public MessageController(
    ApplicationDbContext context,
    IConfiguration configuration,
    UserManager<IdentityUser> userManager,
    SignInManager<IdentityUser> signInManager,
    RoleManager<IdentityRole> roleManager,
    IAmazonSimpleEmailService client,
    IAmazonS3 s3Client

    ) : base(context, configuration, roleManager, client, userManager, signInManager)
        { }

        //get by dietitian, patient (userid) 
        //skip m take n by date desc
        //- Id, Message, senderid, receiverid,groupid,timestamp content
        [HttpGet("getmessages")]
        public async Task<IActionResult> getmessages([FromQuery] int userid, [FromQuery]int skip, [FromQuery] int take)
        {
            try
            {
                var res = _context.Message.Where(x => x.SenderId == userid || x.RecieverId == userid)
                        .OrderByDescending(o => o.Timestamp).Skip(skip).Take(take).Select(m => new
                        {
                            m.Id,
                            m.SenderId,
                            m.RecieverId,
                            m.GroupId,
                            m.Timestamp,
                            m.Contents,
                            FirstName = m.Sender.FirstName,
                            LastName = m.Sender.LastName,
                        }).ToList();
                return Ok(JsonConvert.SerializeObject(res));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }

        [HttpPost("postmessage")]
        public async Task<IActionResult> postmessage([FromBody] Message message)
        {
            try
            {
                var m = new Message();
                m.SenderId = message.SenderId;
                m.RecieverId = message.RecieverId;
                m.GroupId = message.GroupId;
                m.Timestamp = message.Timestamp;
                m.Contents = message.Contents;
                _context.Message.Add(m);
                _context.SaveChanges();
                return Ok(JsonConvert.SerializeObject(m));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }
    }
}
