using Api.Models;

namespace Api.Repositories.IRepositories;

public interface IQuoteRepository
{
    Task<List<Quote>> Get(int bookId);
    Task<int> GetNumberOfFavorites(int bookId);
    Task<Quote?> Get(int bookId, int id);
    Task Create(Quote model);
    void Update(Quote model);
    void Delete(Quote model);
    Task<bool> Save();
}