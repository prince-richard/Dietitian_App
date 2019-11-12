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

namespace DietitianApp.Controllers
{
    //Default security to only request with JWT Bearer Tokens
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/account")]
    public class AccountController : SnaBaseController
    {

        public AccountController(
        ApplicationDbContext context,
        IConfiguration configuration,
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        RoleManager<IdentityRole> roleManager,
        IAmazonSimpleEmailService client
        ) : base(context, configuration, roleManager, client, userManager, signInManager)
        {

        }


        


        [HttpGet("Test")]
        public IActionResult Test()
        {
            var email = User.FindFirst(ClaimTypes.Name).Value;
            UserProfile userprofile = _context.UserProfile.FirstOrDefault(user => user.Email.Equals(email));
            return Ok("Super secret content, I hope you've got clearance for this...");
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> login([FromBody]loginBody userobj)
        {
            try
            {
                IdentityUser user = await _userManager.FindByEmailAsync(userobj.email);
                var result = await _signInManager.CheckPasswordSignInAsync(user, userobj.password, false);
                // bool islocked = await _userManager.IsLockedOutAsync(user);
                if (result.Succeeded)
                {
                    //bool canlogin = _context.UserProfile.Where(x => x.IdentityUserId.Equals(user.Id)).Select(c => c.Inactive).FirstOrDefault();
                    //if (canlogin)
                    //{
                    //    throw new Exception("You have been Locked out");
                    //}
                    var userprofile = _context.UserProfile.Where(r => r.Email == userobj.email).Select(d => new
                    {
                        d.GroupId,
                        d.CreatedDate,
                        d.Id,
                        d.FirstName,
                        d.LastName,
                        d.Email,
                        d.PhoneNumber,
                    }).FirstOrDefault();
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.NameIdentifier, userobj.email),
                        new Claim(ClaimTypes.Email, userobj.email)
                    };
                    var roles = await _userManager.GetRolesAsync(user);
                    foreach (var role in roles)
                    {
                        claims.Add(new Claim("role", role));
                    }

                    //JWT
                    var AppSetting = new AppSetting();
                    _configuration.GetSection("AppSetting").Bind(AppSetting);
                    var secretKey = AppSetting.secretKey;
                    var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)), SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        issuer: AppSetting.Issuer,
                        audience: AppSetting.Audience,
                        claims: claims,
                        expires: DateTime.Now.AddMinutes(1440),
                        signingCredentials: signingCredentials);

                    //var roles = await _userManager.GetRolesAsync(user);
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        id = userprofile.Id,
                        email = userprofile.Email,
                        firstname = userprofile.FirstName,
                        lastname = userprofile.LastName,
                        phonenumber = userprofile.PhoneNumber,
                        groupId = userprofile.GroupId,
                        roles
                    });
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception e)
            {
                return BadRequest(Newtonsoft.Json.JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
            }
        }

        // POST: /Account/Register
        //[HttpPost]
        //[AllowAnonymous]
        //[Route("signup")]
        //public async Task<IActionResult> Register([FromBody]signUpBody obj)
        //{
        //    //Create Identity Framework User
        //    var user = new IdentityUser { UserName = obj.userName, Email = obj.email, PhoneNumber = obj.phoneNumber };
        //    try
        //    {
        //        var result = await _userManager.CreateAsync(user, obj.password);
        //        if (result.Succeeded)
        //        {   
        //            return Ok("User created a new account with password.");
        //        }
        //        else
        //        {
        //            return BadRequest(result.Errors);
        //        }
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(Newtonsoft.Json.JsonConvert.SerializeObject(new returnMsg { message = e.Message }));
        //    }
        //}

        [HttpPost]
        [Route("changeprofiledata")]
        public async Task<JsonResult> changeprofiledata([FromBody]UserProfile userobj)
        {
            try
            {
                var obj = new returnMsg();
                UserProfile user = _context.UserProfile.Where(r => r.Id == userobj.Id).First();
                if (user != null)
                {
                    user.FirstName = userobj.FirstName;
                    user.LastName = userobj.LastName;
                    user.PhoneNumber = userobj.PhoneNumber;
                    _context.Update(user);
                    await _context.SaveChangesAsync();
                    obj.message = "Profile Information Updated.";

                }
                else
                {
                    obj.message = "User Not Found.";
                }
                return new JsonResult(obj);
            }
            catch (Exception e)
            {
                return new JsonResult(e.Message);
            }

        }

        [HttpPost]
        [Route("changepassword")]
        public async Task<IActionResult> changepassword([FromBody]newpass userobj)
        {
            var obj = new returnMsg();
            IdentityUser user = _context.Users.Where(r => r.Email == userobj.email).First();
            var result = await _userManager.ChangePasswordAsync(user, userobj.current_password, userobj.new_password);
            if (result.Succeeded)
            {

                obj.message = "Your Password has been successfully changed.";

            }
            else
            {
                var exceptionText = result.Errors.First();
                return StatusCode(StatusCodes.Status500InternalServerError, exceptionText.Description);
            }
            return Content(JsonConvert.SerializeObject(obj));
        }

        [AllowAnonymous]
        [Route("verifyemail")]
        public async Task<IActionResult> postconfirmEmail([FromBody]ConfirmEmail userobj)
        {
            try
            {
                IdentityUser user = _context.Users.Where(r => r.Email == userobj.email).First();
                string parsedtoken = userobj.token.Replace(" ", "+");
                var result = await _userManager.ConfirmEmailAsync(user, parsedtoken);
                if (result.Succeeded)
                {
                    var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                    var obj = new ResretPassBody();
                    obj.email = userobj.email;
                    obj.token = code;
                    return StatusCode(StatusCodes.Status200OK, JsonConvert.SerializeObject(obj));
                }
                else
                {
                    var exceptionText = result.Errors.First();
                    return StatusCode(StatusCodes.Status500InternalServerError, exceptionText.Description);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No account found with that email address.");
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("accountrecovery/{email}")]
        public async Task<IActionResult> accountrecovery(string email)
        {
            try
            {
                var obj = new returnMsg();
                IdentityUser user = _context.Users.Where(r => r.Email == email).First();
                var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                obj.message = "Password Reset Link sent to " + email;
                _AuthMessageSender.SendEmailAsync(_appData.ApplicationName + " Password Reset Email", "Please reset your account by clicking this link: "
                + _appData.PasswordResetLink + "?email=" + email + "&token=" + code, _AuthMessageSender.SystemGeneralEmail, new List<string> { email });
                //+_appData.PasswordResetLink + "?email=" + email + "&token=" + code, _AuthMessageSender.SystemGeneralEmail, new List<string> { email });

                return StatusCode(StatusCodes.Status200OK, JsonConvert.SerializeObject(obj));
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No account found with that email address.");
            }


        }

        [HttpPost]
        [AllowAnonymous]
        [Route("passwordreset")]
        public async Task<IActionResult> passwordresetconfirm([FromBody]password_reset_token userobj)
        {
            try
            {
                var obj = new returnMsg();
                IdentityUser user = _context.Users.Where(r => r.Email == userobj.email).First();
                var parsedtoken = userobj.token.Replace(" ", "+");
                var result = await _userManager.ResetPasswordAsync(user, parsedtoken, userobj.new_password);
                if (result.Succeeded)
                {
                    obj.message = "Your Password has been successfully changed.";
                    return StatusCode(StatusCodes.Status200OK, JsonConvert.SerializeObject(obj));
                }
                else
                {
                    var exceptionText = result.Errors.First();
                    return StatusCode(StatusCodes.Status500InternalServerError, exceptionText.Description);
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "No account found with that email address.");
            }
        }
    }

    public class returnMsg
    {
        public string message { get; set; }
    }

    public class FeedbackUser
    {
        public string UserEmail { get; set; }
        public string Feedback { get; set; }
        public string Platform { get; set; }
        public string DeviceName { get; set; }
        public string DeviceId { get; set; }
        public string DeviceModel { get; set; }
    }

    public class loginBody
    {
        public string email { get; set; }
        public string password { get; set; }
    }

    public class ResretPassBody
    {
        public string token { get; set; }
        public string email { get; set; }
    }

    public class signUpBody
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string userName { get; set; }
        public string phoneNumber { get; set; }
    }
    public class ConfirmEmail
    {
        public string email { get; set; }
        public string token { get; set; }
    }
    public class newpass
    {
        public string email;
        public string current_password;
        public string new_password;

    }

    public class password_reset_token
    {
        public string email;
        public string token;
        public string new_password;
    }

}
