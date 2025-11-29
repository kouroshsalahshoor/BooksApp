using Api.Models;

namespace Api.Repositories.IRepositories;

public interface IBookRepository
{
    Task<List<Book>> Get();
    Task<Book?> Get(int id);
    Task Create(Book model);
    void Update(Book model);
    void Delete(Book model);
    Task<bool> Save();
    Task<bool> Exists(string title);
    Task<bool> Exists(int id);
}