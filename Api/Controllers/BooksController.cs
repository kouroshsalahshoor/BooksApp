using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Repositories.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Api.Dtos;

namespace Api.Controllers;

[Route("api/Books")]
[ApiController]
//[Authorize]
public class BooksController(IBookRepository _repository, IQuoteRepository _quoteRepository) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<Book>>> Get()
    {
        return await _repository.Get();
    }

    [HttpGet("{id:int}", Name = "GetBook")]
    public async Task<ActionResult<Book>> Get(int id)
    {
        if (id <= 0) { return BadRequest(); }
        var model = await _repository.Get(id);
        if (model == null) return NotFound();

        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<Book>> Post(BookCreateUpdateDto dto)
    {
        if (await _repository.Exists(dto.Title))
            return BadRequest("A book with the same title already exists");

        var now = DateTime.UtcNow;
        var model = new Book
        {
            Id = 0,
            Title = dto.Title,
            Author = dto.Author,
            PublishedDate = DateOnly.Parse(dto.PublishedDate),

            CreatedAt = now,
            CreatedBy = "user",
            UpdatedAt = now,
            UpdatedBy = "user"
        };

        await _repository.Create(model);
        await _repository.Save();

        return CreatedAtRoute("GetBook", new { id = model.Id }, model);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int id, BookCreateUpdateDto dto)
    {
        if (id != dto.Id)
            return BadRequest();

        var now = DateTime.UtcNow;
        var model = await _repository.Get(id);
        if (model == null)
            return NotFound();

        model.Title = dto.Title;
        model.Author = dto.Author;
        model.PublishedDate = DateOnly.Parse(dto.PublishedDate);

        model.UpdatedAt = now;
        model.UpdatedBy = "user";

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

        var items = await _quoteRepository.Get(id);
        if (items != null)
        {
            foreach (var item in items)
            {
                _quoteRepository.Delete(item);
            }
        }

        _repository.Delete(model);
        await _repository.Save();
        return NoContent();
    }
}
