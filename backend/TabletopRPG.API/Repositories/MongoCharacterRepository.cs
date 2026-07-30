using MongoDB.Driver;
using TabletopRPG.API.Models;

namespace TabletopRPG.API.Repositories
{
    public class MongoCharacterRepository : ICharacterRepository
    {
        private readonly IMongoCollection<Character> _characters;

        public MongoCharacterRepository(IConfiguration configuration)
        {
            // Reads the connection string from appsettings.json or environment variables
            var connectionString = configuration.GetConnectionString("MongoDb") 
                                  ?? "mongodb://localhost:27017";
            var databaseName = configuration["DatabaseName"] ?? "TabletopRpgDb";

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            
            _characters = database.GetCollection<Character>("Characters");
        }

        public async Task<List<Character>> GetAllAsync() =>
            await _characters.Find(_ => true).ToListAsync();

        public async Task<Character?> GetByIdAsync(string id) =>
            await _characters.Find(c => c.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Character character) =>
            await _characters.InsertOneAsync(character);

        public async Task UpdateAsync(string id, Character character) =>
            await _characters.ReplaceOneAsync(c => c.Id == id, character);

        public async Task DeleteAsync(string id) =>
            await _characters.DeleteOneAsync(c => c.Id == id);
    }
}