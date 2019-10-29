using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietitianApp.Services
{
    public interface IEmailSender
    {
        void SendEmailAsync(string subject, string html, string from, List<String> to);
    }
}
