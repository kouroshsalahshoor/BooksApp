using Api.Models;

namespace Api.Services.IServices
{
    public interface ITokenService
    {
        string CreateAsync(ApplicationUser user);
        Task<string> UpdateAsync(ApplicationUser user);
    }
}