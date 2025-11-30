using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Repositories.IRepositories;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers;

[Route("api/Books")]
[ApiController]
//[Authorize]
public class BooksController(IBookRepository _repository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Book>>> Get()
    {
        return await _repository.Get();
    }

    [HttpGet("{id:int}", Name = "GetBook")]
    public async Task<ActionResult<Book>> Get(int id)
    {
        var model = await _repository.Get(id);
        if (model == null)
            return NotFound();

        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<Book>> Post(Book model)
    {
        if (await _repository.Exists(model.Title))
            return BadRequest("A book with the same title already exists");

        await _repository.Create(model);

        await _repository.Save();

        return CreatedAtRoute("GetBook", new { id = model.Id }, model);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, Book model)
    {
        if (id != model.Id)
            return BadRequest();

        if (await _repository.Exists(model.Id) == false)
            return NotFound();

        _repository.Update(model);

        await _repository.Save();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var model = await _repository.Get(id);
        if (model == null)
            return NotFound();

        _repository.Delete(model);

        return NoContent();
    }
}
