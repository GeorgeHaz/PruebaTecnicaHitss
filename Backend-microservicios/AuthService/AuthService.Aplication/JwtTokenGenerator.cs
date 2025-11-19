using AuthService.Aplication.Commons;
using AuthService.Aplication.Interfaces;
using AuthService.Domain.Entities;
using AuthService.Utilities.Static;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthService.Aplication
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {

        private readonly IConfiguration _configuration;

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public BaseResponse<string> GenerateToken(ApplicationUser user)
        {
            var response = new BaseResponse<string>();

            try
            {
                if (user is not null)
                {
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim>
                    {
                        new Claim(JwtRegisteredClaimNames.NameId, user.Email!),
                        new Claim(JwtRegisteredClaimNames.FamilyName, user.UserName!),
                        new Claim(JwtRegisteredClaimNames.GivenName, user.Email!),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.Id.ToString()),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                    };

                    var token = new JwtSecurityToken(
                        issuer: _configuration["Jwt:Issuer"],
                        audience: _configuration["Jwt:Issuer"],
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(int.Parse(_configuration["Jwt:Expires"]!)),
                        signingCredentials: credentials
                        );

                    response.IsSuccess = true;
                    response.Data = new JwtSecurityTokenHandler().WriteToken(token);
                    response.Message = ReplyMessages.MESSAGE_TOKEN;
                    return response;
                }
                else
                {
                    response.IsSuccess = false;
                    response.Message = ReplyMessages.MESSAGE_TOKEN_ERROR;
                }
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ReplyMessages.MESSAGE_EXCEPTION;
            }

            return response;
        }
    }
}
