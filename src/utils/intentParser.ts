import { ParsedSearchIntent } from '../types/search';

/**
 * Intelligent client-side Search Intent Parser (Section 17 specification).
 * Identifies structured intents, categories, budgets, and recipients.
 */
export function parseSearchIntent(query: string): ParsedSearchIntent {
  const normalized = query.toLowerCase().trim();
  const result: ParsedSearchIntent = {
    rawQuery: query,
  };

  // Budget detection (e.g. "under $100", "under 50", "< 200")
  const budgetMatch = normalized.match(/(?:under|below|<|\$)\s*(\d+)/i);
  if (budgetMatch && budgetMatch[1]) {
    result.maxBudget = parseInt(budgetMatch[1], 10);
  }

  // Recipient detection (e.g. "for dad", "for him", "for her", "for mom", "for students")
  const recipientMatch = normalized.match(/for\s+(dad|mom|him|her|students|gamers|travelers|kids|men|women)/i);
  if (recipientMatch && recipientMatch[1]) {
    result.recipient = recipientMatch[1];
    result.intent = 'gift';
  }

  // Intent classification
  if (normalized.includes('best') || normalized.includes('top')) {
    result.intent = 'best';
  } else if (normalized.includes('trend') || normalized.includes('viral')) {
    result.intent = 'trending';
  } else if (normalized.includes('cheap') || normalized.includes('budget') || normalized.includes('affordable')) {
    result.intent = 'cheap';
  } else if (normalized.includes('vs') || normalized.includes('compare')) {
    result.intent = 'compare';
  }

  // Category keyword mapping
  if (/headphone|earbud|audio|speaker|sound/i.test(normalized)) {
    result.category = 'tech';
  } else if (/coffee|espresso|grinder|blender|kitchen|cookware|fryer/i.test(normalized)) {
    result.category = 'kitchen';
  } else if (/laptop|macbook|keyboard|desk|monitor|tech|mouse/i.test(normalized)) {
    result.category = 'tech';
  } else if (/vacuum|cleaner|purifier|lamp|home/i.test(normalized)) {
    result.category = 'home';
  } else if (/ring|tracker|massager|fitness|gym|workout/i.test(normalized)) {
    result.category = 'fitness';
  } else if (/bag|backpack|tumbler|travel|luggage/i.test(normalized)) {
    result.category = 'travel';
  }

  return result;
}
