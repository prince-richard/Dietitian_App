using Amazon.S3;
using DietitianApp.Data;
using DietitianApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DietitianApp.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class SignalRHub : Hub
    {

        public ApplicationDbContext _dbcontext;

        public SignalRHub(
            ApplicationDbContext _DBContext,
            RoleManager<IdentityRole> _roleManager,
            UserManager<IdentityUser> _userManager,
            SignInManager<IdentityUser> _signInManager,
            IAmazonS3 s3Client,
            IConfiguration configuration
        )
        {
            _dbcontext = _DBContext;
        }

        public override async Task OnConnectedAsync()
        {
            List<Claim> c = Context.User.Claims.ToList();


            foreach (Claim claim in Context.User.Claims)
            {
                if (claim.Type == ClaimTypes.NameIdentifier)
                {
                    var LoggedInUser = claim.Value;
                    //GroupName = Username.. Make a group of the username for all his devices
                    await AddToGroup(LoggedInUser);
                }
            }
        }

        public override async Task OnDisconnectedAsync(Exception e)
        {

            foreach (Claim claim in Context.User.Claims)
            {
                if (claim.Type == ClaimTypes.NameIdentifier)
                {
                    var LoggedInUser = claim.Value;
                    await RemoveFromGroup(LoggedInUser);
                }
            }
        }

        public async Task AddToGroup(string groupName)
        {
            var user = _dbcontext.UserProfile.FirstOrDefault(u => u.Email == groupName);
            var conn = _dbcontext.ChatConnection.FirstOrDefault(c => c.ConnectionOwnerId == user.Id);
            if (conn == null)
            {
                var nConn = new ChatConnection() {
                    ConnectionOwnerId = user.Id,
                    IsConnected = true,
                    LastEnter = DateTime.Now,
                    LastLeave = null,
                    GroupId = user.GroupId
                };
                _dbcontext.ChatConnection.Add(nConn);
            } else
            {
                conn.IsConnected = true;
                conn.LastEnter = DateTime.Now;
                _dbcontext.ChatConnection.Update(conn);
            }
            _dbcontext.SaveChanges();

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        }


        public string GetConnectionId()
        {
            return Context.ConnectionId;
        }
    }


}

