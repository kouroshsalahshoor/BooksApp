using Api.Models;

namespace Api.Services.IServices
{
    public interface ITokenService
    {
        string Create(ApplicationUser user);
        string Update(ApplicationUser user);
    }
}