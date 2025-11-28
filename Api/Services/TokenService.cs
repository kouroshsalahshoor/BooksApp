using Api.Models;
using Api.Services.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services;

public class TokenService(IConfiguration _config) : ITokenService
{
    public string CreateAsync(ApplicationUser user)
    {
        var jwtSettings = _config.GetSection("Jwt") ?? throw new Exception("Cant read Jwt");

        var key = _config["TokenKey"] ?? throw new Exception("Cant read TokenKey");
        if (key.Length < 64) throw new Exception("Token key must be at leat 64 characters long");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.UserName ?? ""),
            new Claim(ClaimTypes.Email, user.Email ?? ""),
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"],
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = creds,
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiresMinutes"]!)),
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<string> UpdateAsync(ApplicationUser user)
    {
        throw new NotImplementedException();
    }
}
