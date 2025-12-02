using Microsoft.AspNetCore.Mvc;
using Api.Models;
using Api.Repositories.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Api.Dtos;

namespace Api.Controllers;

[Route("api/Book/{bookId:int}/Quotes")]
[ApiController]
//[Authorize]
public class QuotesController(IQuoteRepository _repository) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<List<Quote>>> Get(int bookId)
    {
        if (bookId <= 0) { return BadRequest(); }
        return await _repository.Get(bookId);
    }

    [HttpGet("{id:int}", Name = "GetQuote")]
    public async Task<ActionResult<Book>> Get(int bookId, int id)
    {
        if (bookId <= 0 || id <= 0) { return BadRequest(); }
        var model = await _repository.Get(bookId, id);
        if (model == null) return NotFound();

        return Ok(model);
    }

    [HttpPost]
    public async Task<ActionResult<Quote>> Post(QuoteCreateUpdateDto dto)
    {
        var now = DateTime.UtcNow;
        var model = new Quote
        {
            Id = 0,
            Text = dto.Text,
            PageNumber = dto.PageNumber,
            RowNumber = dto.RowNumber,
            BookId = dto.BookId,

            CreatedAt = now,
            CreatedBy = "user",
            UpdatedAt = now,
            UpdatedBy = "user"
        };

        await _repository.Create(model);
        await _repository.Save();

        return CreatedAtRoute("GetQuote", new { bookId = model.BookId, id = model.Id }, model);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> Put(int bookId, int id, QuoteCreateUpdateDto dto)
    {
        if (bookId <= 0 || id <= 0) { return BadRequest(); }
        if (id != dto.Id) return BadRequest();

        var now = DateTime.UtcNow;
        var model = await _repository.Get(bookId, id);
        if (model == null) return NotFound();

        model.Text = dto.Text;
        model.PageNumber = dto.PageNumber;
        model.RowNumber = dto.RowNumber;
        model.BookId = dto.BookId;

        model.UpdatedAt = now;
        model.UpdatedBy = "user";

        _repository.Update(model);
        await _repository.Save();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBook(int bookId, int id)
    {
        if (bookId <= 0 || id <= 0) { return BadRequest(); }

        var model = await _repository.Get(bookId, id);
        if (model == null) return NotFound();

        _repository.Delete(model);
        await _repository.Save();
        return NoContent();
    }
}
