-- ============================================
-- PART 16: AUTOMATION & ZERO DEFAULT DATA SCHEMA
-- ============================================

-- Add automation columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS last_sync_source TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMPTZ;
ALTER TABLE products ADD COLUMN IF NOT EXISTS external_id TEXT;

-- Create index on external_id for fast feed matching
CREATE INDEX IF NOT EXISTS idx_products_external_id ON products(external_id);

-- Add automation columns to deals table
ALTER TABLE deals ADD COLUMN IF NOT EXISTS auto_discovered BOOLEAN DEFAULT false;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS source_signal TEXT;
