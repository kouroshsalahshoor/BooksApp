using Api.Dtos;
using Api.Models;
using Api.Services.IServices;

namespace Api.Utils;

public static class ApplicationUserExtension
{
    public static UserDto ToDto(this ApplicationUser user, ITokenService _tokenService)
    {
        return new UserDto(
                Id: user.Id,
                UserName: user.UserName!,
                Email: user.Email!,
                Token: _tokenService.Create(user)
            );
    }
}
