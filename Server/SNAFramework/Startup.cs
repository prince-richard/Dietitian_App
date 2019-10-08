using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using Amazon;
using Amazon.S3;
using Amazon.Runtime.CredentialManagement;
using Amazon.SimpleEmail;
using SNAFramework.Data;
using Microsoft.EntityFrameworkCore;

namespace SNAFramework
{
    public class AppSetting
    {
        public string secretKey { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
    }

    public class AWS_keys
    {
        public string Profile { get; set; }
        public string AWSAccessKey { get; set; }
        public string AWSSecretKey { get; set; }
    }

    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see https://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            //signalR
            services.AddSignalR();

            // Add framework services.
            services.AddDbContext<ApplicationDbContext>(options =>
                  options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddMvc();
            services.AddCors(options => options.AddPolicy("CorsPolicy",
                   builder =>
                   {
                       builder.AllowAnyMethod().AllowAnyHeader()
                              .WithOrigins("http://localhost:4200")
                              .AllowCredentials();
                   }));
            services.AddSingleton<IConfiguration>(Configuration);

            //JWT
            var AppSetting = new AppSetting();
            Configuration.GetSection("AppSetting").Bind(AppSetting);
            var secretKey = AppSetting.secretKey;
            var tokenValidationParameters = new TokenValidationParameters
            {
                // The signing key must match!
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(secretKey)),

                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = AppSetting.Issuer,

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = AppSetting.Audience,

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = tokenValidationParameters;
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        if (!string.IsNullOrEmpty(accessToken) &&
                            (context.HttpContext.WebSockets.IsWebSocketRequest || context.Request.Headers["Accept"] == "text/event-stream"))
                        {
                            context.Token = context.Request.Query["access_token"];
                        }
                        return Task.CompletedTask;
                    }
                };
            });


            //AWS Profile
            var AWS_keys = new AWS_keys();
            Configuration.GetSection("AWS").Bind(AWS_keys);
            var aws_profile = AWS_keys.Profile;
            var keys = new CredentialProfileOptions
            {
                AccessKey = AWS_keys.AWSAccessKey,
                SecretKey = AWS_keys.AWSSecretKey
            };
            var profile = new CredentialProfile(aws_profile, keys);
            var sharedFile = new SharedCredentialsFile();
            sharedFile.RegisterProfile(profile);
            
            IAmazonSimpleEmailService client = Configuration.GetAWSOptions().CreateServiceClient<IAmazonSimpleEmailService>();

            services.AddDefaultAWSOptions(Configuration.GetAWSOptions());
            services.AddAWSService<IAmazonSimpleEmailService>();

            IAmazonS3 s3Client = Configuration.GetAWSOptions().CreateServiceClient<IAmazonS3>();
            services.AddAWSService<IAmazonS3>();

          

            return services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.Use(async (context_http, next) => {
                await next();
                if (context_http.Response.StatusCode == 404 &&
                   !Path.HasExtension(context_http.Request.Path.Value) &&
                   !context_http.Request.Path.Value.StartsWith("/api/") && !context_http.Request.Path.Value.StartsWith("/hazmathub"))
                {
                    context_http.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseStaticFiles();

            app.UseAuthentication();
            app.UseCors("CorsPolicy");
            //signalR
            //app.UseSignalR(routes =>
            //{
            //    routes.MapHub<HazmatHub>("/hazmathub");
            //});

            app.UseMvc();
        }
    }
}
