using TabletopRPG.API.Models;

namespace TabletopRPG.API.Repositories
{
    public class InMemoryCharacterRepository : ICharacterRepository
    {
        // Thread-sichere Liste im Arbeitsspeicher
        private readonly List<Character> _characters = new();

        public Task<List<Character>> GetAllAsync()
        {
            return Task.FromResult(_characters.ToList());
        }

        public Task<Character?> GetByIdAsync(string id)
        {
            var character = _characters.FirstOrDefault(c => c.Id == id);
            return Task.FromResult(character);
        }

        public Task CreateAsync(Character character)
        {
            // Neue GUID generieren, falls noch keine vorhanden ist
            if (string.IsNullOrEmpty(character.Id))
            {
                character.Id = Guid.NewGuid().ToString();
            }

            _characters.Add(character);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(string id, Character character)
        {
            var index = _characters.FindIndex(c => c.Id == id);
            if (index != -1)
            {
                _characters[index] = character;
            }
            return Task.CompletedTask;
        }

        public Task DeleteAsync(string id)
        {
            _characters.RemoveAll(c => c.Id == id);
            return Task.CompletedTask;
        }
    }
}