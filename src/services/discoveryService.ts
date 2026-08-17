import { supabaseService } from './supabaseService';
import { Product } from '../types/product';
import { FinderAnswers, FinderMatchResult } from '../types/discovery';

class DiscoveryService {
  async getHiddenGems(): Promise<{ featured: Product | null; gems: Product[] }> {
    const gems = await supabaseService.getHiddenGems();
    if (gems.length === 0) {
      const all = await supabaseService.getProducts();
      const fallback = all.filter(p => p.worthScore > 88);
      return {
        featured: fallback[0] || null,
        gems: fallback.slice(1, 9)
      };
    }

    return {
      featured: gems[0] || null,
      gems: gems.slice(1)
    };
  }

  async getOverhypedWithAlternatives(): Promise<{
    featuredAlert: Product | null;
    alternative: Product | null;
    overhypedList: Product[];
  }> {
    const overhyped = await supabaseService.getOverhypedProducts();
    const all = await supabaseService.getProducts();

    const featuredAlert = overhyped[0] || null;
    // Find highest worth product in same or adjacent category
    let alternative: Product | null = null;
    if (featuredAlert) {
      alternative = all.find(p => p.category === featuredAlert.category && p.worthScore > 90 && p.id !== featuredAlert.id) ||
                    all.find(p => p.worthScore > 92 && p.id !== featuredAlert.id) || null;
    }

    return {
      featuredAlert,
      alternative,
      overhypedList: overhyped.slice(1)
    };
  }

  async matchProducts(answers: FinderAnswers): Promise<FinderMatchResult> {
    const allProducts = await supabaseService.getProducts();

    // Filter by category if not 'all' or 'other'
    let candidates = allProducts;
    if (answers.category && answers.category !== 'all' && answers.category !== 'other') {
      candidates = allProducts.filter(p => p.category === answers.category);
      if (candidates.length === 0) candidates = allProducts;
    }

    // Filter by budget ceiling if set
    let budgetFiltered = candidates;
    if (answers.budgetCeiling > 0) {
      budgetFiltered = candidates.filter(p => p.priceUSD <= answers.budgetCeiling);
      if (budgetFiltered.length === 0) budgetFiltered = candidates; // Fallback gracefully
    }

    // Score candidates based on priorities
    const scored = budgetFiltered.map(product => {
      let score = 0;
      // High worth score weight
      score += (product.worthScore / 100) * 40;

      // Priority weights
      if (answers.priorities.includes('price')) {
        // Lower price within budget gets points
        const priceEfficiency = answers.budgetCeiling > 0 ? (1 - (product.priceUSD / answers.budgetCeiling)) * 25 : 15;
        score += Math.max(0, priceEfficiency);
      }
      if (answers.priorities.includes('quality') || answers.priorities.includes('durability')) {
        score += ((product.scoreBreakdown?.buildQuality || 90) / 100) * 30;
      }
      if (answers.priorities.includes('performance')) {
        score += (product.rating / 5) * 25;
      }

      return { product, score };
    });

    scored.sort((a, b) => b.score - a.score);

    const bestMatch = scored[0]?.product || allProducts[0];
    
    // Best Value: Lowest price with high worth
    const valueCandidates = [...budgetFiltered].sort((a, b) => (b.worthScore / b.priceUSD) - (a.worthScore / a.priceUSD));
    const bestValue = valueCandidates[0] || allProducts[1] || bestMatch;

    // Premium Choice: Highest build quality / highest price within category
    const premiumCandidates = [...budgetFiltered].sort((a, b) => b.priceUSD - a.priceUSD);
    const premiumChoice = premiumCandidates[0] || allProducts[2] || bestMatch;

    return {
      bestMatch,
      bestValue,
      premiumChoice,
      matchScore: 9
    };
  }
}

export const discoveryService = new DiscoveryService();
