using System;

namespace Api.Models;

public class ApplicationUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; } = default!;
    public required string Email { get; set; } = default!;
}
