using TabletopRPG.API.Models;

namespace TabletopRPG.API.Repositories
{
    public interface ICharacterRepository
    {
        Task<List<Character>> GetAllAsync();
        Task<Character?> GetByIdAsync(string id);
        Task CreateAsync(Character character);
        Task UpdateAsync(string id, Character character);
        Task DeleteAsync(string id);
    }
}