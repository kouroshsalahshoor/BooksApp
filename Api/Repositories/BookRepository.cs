using Api.Data;
using Api.Models;
using Api.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories;

public class BookRepository(ApplicationDbContext _db) : IBookRepository
{
    public async Task<List<Book>> Get()
    {
        return await _db.Books.ToListAsync();
    }

    public async Task<Book?> Get(int id)
    {
        return await _db.Books.SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task Create(Book model)
    {
        var now = DateTime.UtcNow;
        model.CreatedAt = now;
        model.UpdatedAt = now;

        await _db.Books.AddAsync(model);
        await _db.SaveChangesAsync();
    }

    public void Update(Book model)
    {
        var now = DateTime.UtcNow;
        model.UpdatedAt = now;

        _db.Entry(model).State = EntityState.Modified;
    }

    public void Delete(Book model)
    {
        _db.Books.Remove(model);
    }

    public async Task<bool> Exists(int id)
    {
        return await _db.Books.AnyAsync(x=>x.Id == id);
    }

    public async Task<bool> Exists(string title)
    {
        return await _db.Books.AnyAsync(x => x.Title == title);
    }

    public async Task<bool> Save()
    {
        return await _db.SaveChangesAsync() > 0;
    }
}
