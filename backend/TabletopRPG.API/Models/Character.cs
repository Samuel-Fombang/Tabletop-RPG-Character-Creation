namespace TabletopRPG.API.Models
{
    public class Character
    {
        // Profile Info
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string Name { get; set; } = string.Empty;
        public string Nickname { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public int Age { get; set; }
        public string PrimaryRace { get; set; } = string.Empty;
        public int CharacterLevel { get; set; } = 1;

        // Core Health Stats
        public int CurrentHp { get; set; }
        public int MaxHp { get; set; }

        // Primary Eteria Stats
        public int Strength { get; set; }
        public int Dexterity { get; set; }
        public int Constitution { get; set; }

        // Mental Stats
        public int Mind { get; set; }
        public int Attunement { get; set; }

        // Maneuver & Derived Stats
        public int ActionPoints { get; set; }
        public int Initiative { get; set; }

        // Helper Method: Automated Stat Calculation
        public void CalculateDerivedStats()
        {
            // Automated formula based on primary attributes
            this.MaxHp = (this.Constitution * 10) + (this.CharacterLevel * 5);
            this.CurrentHp = this.MaxHp;
            this.ActionPoints = 2 + (this.Dexterity / 2);
            this.Initiative = this.Dexterity + this.Mind;
        }
    }
}