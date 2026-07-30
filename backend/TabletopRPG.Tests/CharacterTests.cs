using TabletopRPG.API.Models;
using Xunit;

namespace TabletopRPG.Tests
{
    public class CharacterTests
    {
        [Fact]
        public void CalculateDerivedStats_ShouldCalculateCorrectHp_ForLevel1Character()
        {
            // Arrange (Set up test data)
            var character = new Character
            {
                CharacterLevel = 1,
                Constitution = 15
            };

            // Act (Run the method)
            character.CalculateDerivedStats();

            // Assert (Verify the expected outcome: 15 * 10 + 1 * 5 = 155)
            Assert.Equal(155, character.MaxHp);
            Assert.Equal(155, character.CurrentHp);
        }

        [Fact]
        public void CalculateDerivedStats_ShouldCalculateCorrectActionPointsAndInitiative()
        {
            // Arrange
            var character = new Character
            {
                Dexterity = 14,
                Mind = 10
            };

            // Act
            character.CalculateDerivedStats();

            // Assert
            // Action Points: 2 + floor(14 / 2) = 9
            Assert.Equal(9, character.ActionPoints);
            
            // Initiative: 14 + 10 = 24
            Assert.Equal(24, character.Initiative);
        }
    }
}