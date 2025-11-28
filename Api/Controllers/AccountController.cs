using Api.Dtos;
using Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/account")]
    public class AccountController(
        //ITokenService _tokenService,
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

            return Ok(dto);
            //return Ok(user.ToDto(_tokenService));
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.UserName);
            if (user == null || !(await _userManager.CheckPasswordAsync(user, dto.Password)))
                return Unauthorized("Invalid login");

            return Ok();
            //return Ok(user.toDto(_tokenService));
        }
    }
}
