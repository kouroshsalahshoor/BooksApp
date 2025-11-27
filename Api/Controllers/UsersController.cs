using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[Route("api/users")]
[ApiController]
public class UsersController(ApplicationDbContext _db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ApplicationUser>>> Get()
    {
        var models = await _db.Users.ToListAsync();
        return Ok(models);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApplicationUser?>> Get(string id)
    {
        var model = await _db.Users.FirstOrDefaultAsync(x => x.Id == id);
        if (model is null)
            return NotFound();
        return Ok(model);
    }
}
