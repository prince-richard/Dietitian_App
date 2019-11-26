using Amazon.S3;
using DietitianApp.Data;
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
                    ////MomentChats
                    //var userId = _dbcontext.UserProfile.First(s => s.UserName == LoggedInUser).Id;
                    //var momentChatIds = _dbcontext.MomentChatGroupMember.Where(s => s.UserProfileId == userId && s.IsActive == true).Select(s => s.MomentChatGroupId).ToList();
                    //momentChatIds.ForEach(async chatId =>
                    //{
                    //    await AddToGroup("moment-" + chatId);
                    //});
                    ////EventChats
                    //var eventChatIds = _dbcontext.EventChatGroupMember.Where(s => s.UserProfileId == userId && s.IsActive == true).Select(s => s.EventChatGroupId).ToList();
                    //eventChatIds.ForEach(async chatId =>
                    //{
                    //    await AddToGroup("event-" + chatId);
                    //});
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

                    //MomentChats




                }
            }
        }

        public async Task AddToGroup(string groupName)
        {
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

