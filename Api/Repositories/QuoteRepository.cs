using Api.Data;
using Api.Models;
using Api.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Api.Repositories;

public class QuoteRepository(ApplicationDbContext _db) : IQuoteRepository
{
    public async Task<List<Quote>> Get(int bookId)
    {
        return await _db.Quotes.Where(x=> x.BookId == bookId).ToListAsync();
    }

    public async Task<int> GetNumberOfFavorites(int bookId)
    {
        return await _db.Quotes.CountAsync(x => x.BookId == bookId && x.IsFavorite == true);
    }

    public async Task<Quote?> Get(int bookId, int id)
    {
        return await _db.Quotes.SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task Create(Quote model)
    {
        var now = DateTime.UtcNow;
        model.CreatedAt = now;
        model.CreatedBy = "system";
        model.UpdatedAt = now;
        model.UpdatedBy = "system";

        await _db.Quotes.AddAsync(model);
    }

    public void Update(Quote model)
    {
        var now = DateTime.UtcNow;
        model.UpdatedAt = now;
        model.UpdatedBy = "system";

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
