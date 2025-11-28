using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public record RegisterDto([Required] string UserName, [Required][EmailAddress] string Email, [Required] string Password);
public record LoginDto([Required] string UserName, [Required] string Password);
public record UserDto(string Id, string UserName, string Email, string Token);
