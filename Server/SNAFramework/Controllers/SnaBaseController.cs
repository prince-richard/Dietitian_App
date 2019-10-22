using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SNAFramework.Data;
using SNAFramework.Services;
using Amazon.SimpleEmail;

namespace SNAFramework.Controllers
{
    public abstract class SnaBaseController : Controller
    {
        public readonly IConfiguration _configuration;
        public readonly ApplicationDbContext _context;
        public readonly UserManager<IdentityUser> _userManager;
        public readonly SignInManager<IdentityUser> _signInManager;
        public readonly RoleManager<IdentityRole> _roleManager;
        public readonly AuthMessageSender _AuthMessageSender;
        public readonly AppDataService _appData;

        public SnaBaseController(
        ApplicationDbContext context,
        IConfiguration configuration,
        RoleManager<IdentityRole> roleManager,
        IAmazonSimpleEmailService client,
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager
        )
        {
            _configuration = configuration;
            _roleManager = roleManager;
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _AuthMessageSender = new AuthMessageSender(client, _configuration);
            _appData = new AppDataService(_configuration);
        }


    }
}