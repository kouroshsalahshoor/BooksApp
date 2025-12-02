using Api.Data;
using Api.Models;
using Api.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Api.Repositories;

public class QuoteRepository(ApplicationDbContext _db) : IQuoteRepository
{
    public async Task<List<Quote>> Get(int bookId)
    {
        return await _db.Quotes.Where(x=> x.BookId == bookId).ToListAsync();
    }

    public async Task<Quote?> Get(int bookId, int id)
    {
        return await _db.Quotes.SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task Create(Quote model)
    {
        var now = DateTime.UtcNow;
        model.CreatedAt = now;
        model.UpdatedAt = now;

        await _db.Quotes.AddAsync(model);
        await _db.SaveChangesAsync();
    }

    public void Update(Quote model)
    {
        var now = DateTime.UtcNow;
        model.UpdatedAt = now;

        _db.Entry(model).State = EntityState.Modified;
    }

    public void Delete(Quote model)
    {
        _db.Quotes.Remove(model);
    }

    public async Task<bool> Save()
    {
        return await _db.SaveChangesAsync() > 0;
    }
}
