-- ============================================
-- PART 20: CURRENCY SYSTEM SCHEMA & RATES
-- ============================================

-- Add multi-currency columns to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_usd DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_gbp DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_eur DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_cad DECIMAL(10,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS price_aud DECIMAL(10,2);

-- Update deals table for currency
ALTER TABLE public.deals ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- Update profiles table for currency preferences
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_currency TEXT DEFAULT 'USD';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferred_country TEXT DEFAULT 'US';

-- Currency Exchange Rates Table
CREATE TABLE IF NOT EXISTS public.currency_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_currency TEXT DEFAULT 'USD',
  target_currency TEXT NOT NULL,
  rate DECIMAL(10,6) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(base_currency, target_currency)
);

-- Insert Default Exchange Rates
INSERT INTO public.currency_rates (base_currency, target_currency, rate) VALUES 
('USD', 'GBP', 0.79),
('USD', 'EUR', 0.92),
('USD', 'CAD', 1.36),
('USD', 'AUD', 1.52)
ON CONFLICT (base_currency, target_currency) DO UPDATE SET rate = EXCLUDED.rate, updated_at = NOW();

-- Row Level Security (RLS)
ALTER TABLE public.currency_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read currency_rates" ON public.currency_rates FOR SELECT USING (true);
CREATE POLICY "Admin full access currency_rates" ON public.currency_rates FOR ALL USING (public.is_admin());
