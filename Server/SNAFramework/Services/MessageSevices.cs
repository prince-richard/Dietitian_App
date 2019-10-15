using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;

namespace DietitianApp.Services
{

    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link https://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {

        private IConfigurationRoot Configuration { get; }
        private IAmazonSimpleEmailService client { get; set; }

        public string SystemGeneralEmail;

        private string bcc = string.Empty;

        public AuthMessageSender(IAmazonSimpleEmailService client, IConfiguration Configuration)
        {
            this.client = client;
            this.SystemGeneralEmail = Configuration.GetSection("ApplicationEmailConfig").GetSection("SystemGeneralEmail").Value;
            this.bcc = Configuration.GetSection("ApplicationEmailConfig").GetSection("DefaultBcc").Value;
        }

        public async void SendEmailAsync(string subject, string html, string from, List<String> to)
        {
            // Plug in your email service here to send an email.
            Body htmlbody = new Body()
            {
                Html = new Content(html)
            };
            if (subject.Trim().Length == 0)
            {
                subject = "No Subject";
            }
            //Build Destination
            Destination dest = new Destination();
            dest.ToAddresses.AddRange(to);
            if (bcc.Length > 0)
            {
                dest.BccAddresses.Add(bcc);
            }

            SendEmailRequest emailrequest = new SendEmailRequest()
            {
                Source = from,
                Destination = dest,
                Message = new Message(new Content(subject), htmlbody),
                ReturnPath = from
            };

            try
            {
                await client.SendEmailAsync(emailrequest);
            }
            catch
            {
                //Aws sanbox : Email not verified
            }

        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}