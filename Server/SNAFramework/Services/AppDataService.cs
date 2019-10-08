
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace SNAFramework.Services
{
    public class AppDataService
    {
        private IConfigurationRoot Configuration { get; }
        public string EmailConfirmLink;
        public string ApplicationName;
        public string ApplicationUser;
        public string PasswordResetLink;

        public AppDataService(IConfiguration Configuration)
        {
            this.EmailConfirmLink = Configuration.GetSection("Application").GetSection("EmailConfirmLink").Value;
            this.ApplicationName = Configuration.GetSection("Application").GetSection("ApplicationName").Value;
            this.ApplicationUser = Configuration.GetSection("Application").GetSection("ApplicationUsers").Value;
            this.PasswordResetLink = Configuration.GetSection("Application").GetSection("PasswordResetLink").Value;
        }
    }
}