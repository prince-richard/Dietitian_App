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
using DietitianApp.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace DietitianApp.Controllers
{

    // GET: /<controller>/
    [Authorize(AuthenticationSchemes = "Bearer", Roles = "User, Administrator")]
    [Route("api/message")]
    public class MessageController : SnaBaseController
    {
        public readonly S3Service _s3Service;
        private IHubContext<SignalRHub> _signalRHubContext { get; set; }

        public MessageController(
            ApplicationDbContext context,
            IConfiguration configuration,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            IAmazonSimpleEmailService client,
            IAmazonS3 s3Client,
            IHubContext<SignalRHub> signalRHub
            ) : base(context, configuration, roleManager, client, userManager, signInManager)
        {
            _s3Service = new S3Service(s3Client, _configuration);
            _signalRHubContext = signalRHub;
        }


        [HttpPost("")]
        public async Task<IActionResult> CreateMessage([FromBody] Message message)
        {
            try
            {
                var nMsg = new Message()
                {
                    Contents = message.Contents,
                    GroupId = message.GroupId,
                    RecieverId = message.RecieverId,
                    SenderId = message.SenderId,
                    Timestamp = DateTime.Now
                };
                _context.Message.Update(nMsg);
                await _context.SaveChangesAsync();

                var senderConnection = _context.ChatConnection.FirstOrDefault(c => c.ConnectionOwnerId == message.SenderId);
                var recieverConnection = _context.ChatConnection.FirstOrDefault(c => c.ConnectionOwnerId == message.SenderId);
                var sender = _context.UserProfile.FirstOrDefault(u => u.Id == message.SenderId);
                var reciever = _context.UserProfile.FirstOrDefault(u => u.Id == message.RecieverId);

                var retObj = new
                {
                    Id = nMsg.Id,
                    Contents = nMsg.Contents,
                    GroupId = nMsg.GroupId,
                    RecieverId = nMsg.RecieverId,
                    SenderId = nMsg.SenderId,
                    Timestamp = DateTime.Now
                };

                var groups = _signalRHubContext.Groups;
                var client = _signalRHubContext.Clients.Group(reciever.Email);
                if (senderConnection.IsConnected) await _signalRHubContext.Clients.Group(sender.Email).SendAsync("chatlistener", sender.Email, retObj);
                if (recieverConnection.IsConnected) await _signalRHubContext.Clients.Group(reciever.Email).SendAsync("chatlistener", sender.Email, retObj);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }
        [HttpGet("GetMessages")]
        public async Task<IActionResult> GetMessages([FromQuery] int userId, [FromQuery] int take)
        {
            try
            {
                if (userId == 0)
                {
                    var m = _context.Message.OrderByDescending(x => x.Id).Take(take);
                    return Ok(JsonConvert.SerializeObject(m));
                }
                else
                {
                    var m = _context.Message.Where(s => s.SenderId == userId || s.RecieverId == userId).OrderByDescending(x => x.Id).Take(take).ToList();
                    return Ok(JsonConvert.SerializeObject(m));
                }
            }
        [HttpGet("GetMessages")]
        public async Task<IActionResult> GetMessages([FromQuery] int userId, [FromQuery] int take)
        {
            try
            {
                if (userId == 0)
                {
                    var m = _context.Message.OrderByDescending(x => x.Id).Take(take);
                    return Ok(JsonConvert.SerializeObject(m));
                }
                else
                {
                    var m = _context.Message.Where(s => s.SenderId == userId || s.RecieverId == userId).OrderByDescending(x => x.Id).Take(take).ToList();
                    return Ok(JsonConvert.SerializeObject(m));
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }
    }
}
