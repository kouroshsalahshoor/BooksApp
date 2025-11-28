using Api.Dtos;
using Api.Models;
using Api.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/account")]
    public class AccountController(
        ITokenService _tokenService,
        UserManager<ApplicationUser> _userManager) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.UserName,
                Email = dto.Email,

                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
            };

            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }

                return ValidationProblem();
            }

            var userDto = new UserDto(
                Id: user.Id,
                UserName: user.UserName!,
                Email: user.Email!,
                Token: _tokenService.Create(user)
            );

            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, dto.Password)))
                return Unauthorized("Invalid login");

            var userDto = new UserDto(
                Id: user.Id,
                UserName: user.UserName!,
                Email: user.Email!,
                Token: _tokenService.Create(user)
            );

            return Ok(userDto);
        }
    }
}
