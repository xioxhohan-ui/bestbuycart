export interface ScoreBreakdown {
  // Hype score breakdown (Trend, Buzz, Velocity)
  trendVelocity: number;      // 0 - 100
  socialBuzz: number;         // 0 - 100
  searchGrowth: number;       // 0 - 100

  // Worth score breakdown (Quality, Value, Longevity)
  buildQuality: number;       // 0 - 100
  valueForMoney: number;      // 0 - 100
  featureSet: number;         // 0 - 100
  userSatisfaction: number;   // 0 - 100
  editorialRating: number;    // 0 - 100
}

export type ScoreVerdictType = 'worth_it' | 'rising_fast' | 'hidden_gem' | 'overhyped' | 'solid_pick' | 'editor_choice';
