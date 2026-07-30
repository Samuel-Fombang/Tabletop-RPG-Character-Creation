using Microsoft.AspNetCore.Mvc;
using TabletopRPG.API.Models;
using TabletopRPG.API.Repositories;

namespace TabletopRPG.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        private readonly ICharacterRepository _repository;

        // Dependency Injection
        public CharacterController(ICharacterRepository repository)
        {
            _repository = repository;
        }

        // POST: api/character/calculate
        [HttpPost("calculate")]
        public async Task<ActionResult<Character>> CalculateAndSaveStats([FromBody] Character character)
        {
            if (character == null)
            {
                return BadRequest("Character data is missing.");
            }

            // 1. Calculate stats
            character.CalculateDerivedStats();

            // 2. Save to MongoDb database
            await _repository.CreateAsync(character);

            // 3. Return created character
            return Ok(character);
        }

        // GET: api/character
        [HttpGet]
        public async Task<ActionResult<List<Character>>> GetAllCharacters()
        {
            var characters = await _repository.GetAllAsync();
            return Ok(characters);
        }
    }
}