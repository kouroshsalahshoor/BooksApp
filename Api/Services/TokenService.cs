using Api.Models;
using Api.Services.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Services;

public class TokenService(IConfiguration _config) : ITokenService
{
    public string Create(ApplicationUser user)
    {
        var jwtSettings = _config.GetSection("Jwt") ?? throw new Exception("Can't read Jwt");

        var key = jwtSettings["Key"] ?? throw new Exception("Can't read TokenKey");
        if (key.Length < 64) throw new Exception("Token key must be at least 64 characters long");

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var creds = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

        var claims = new List<Claim>
        {
            new (ClaimTypes.NameIdentifier, user.Id),
            new (ClaimTypes.Name, user.UserName!),
            new (ClaimTypes.Email, user.Email!),
        };

        var issuer = jwtSettings["Issuer"] ?? throw new Exception("Can't read Issuer");
        var audience = jwtSettings["Audience"] ?? throw new Exception("Can't read Audience");
        var expiresMinutes = jwtSettings["ExpiresMinutes"] ?? throw new Exception("Can't read ExpiresMinutes");

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Issuer = issuer,
            Audience = audience,
            Subject = new ClaimsIdentity(claims),
            SigningCredentials = creds,
            Expires = DateTime.UtcNow.AddMinutes(double.Parse(expiresMinutes)),
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public string Update(ApplicationUser user)
    {
        throw new NotImplementedException();
    }
}
