using Microsoft.AspNetCore.Mvc;
using TabletopRPG.API.Models;

namespace TabletopRPG.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : ControllerBase
    {
        // POST: api/character/calculate
        [HttpPost("calculate")]
        public ActionResult<Character> CalculateStats([FromBody] Character character)
        {
            if (character == null)
            {
                return BadRequest("Character data is missing.");
            }

            // Run your automated stat formulas (HP, AP, Initiative)
            character.CalculateDerivedStats();

            // Return the updated character object with HTTP 200 OK
            return Ok(character);
        }
    }
}