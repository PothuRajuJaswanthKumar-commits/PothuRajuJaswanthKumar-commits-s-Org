
-- PROJECT TASKARINCHUTA: PHASE 1 SCHEMA
-- Role-Based Access Control & Content Ledger

-- 1. Custom Types
CREATE TYPE user_role AS ENUM ('admin', 'subscriber', 'free_user');
CREATE TYPE transmutation_status AS ENUM ('queued', 'processing', 'completed', 'failed');

-- 2. Profiles Table (Extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'free_user',
  has_claimed_gift BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Subscriptions Table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('active', 'trialing', 'past_due', 'canceled')),
  plan_type TEXT CHECK (plan_type IN ('monthly', 'yearly')),
  current_period_end TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. Transmutations (The Content Ledger)
CREATE TABLE public.transmutations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  trend_hook TEXT NOT NULL,
  status transmutation_status DEFAULT 'queued',
  video_url TEXT,
  is_watermarked BOOLEAN DEFAULT TRUE,
  cost_estimate NUMERIC(10, 4) DEFAULT 0.0000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. System Configuration (Singleton)
CREATE TABLE public.system_config (
  id INTEGER PRIMARY KEY CHECK (id = 1), -- Ensures only one row
  master_switch BOOLEAN DEFAULT TRUE,
  daily_budget_cap NUMERIC(10, 2) DEFAULT 50.00,
  current_daily_spend NUMERIC(10, 2) DEFAULT 0.00,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Initialize Singleton Config
INSERT INTO public.system_config (id, master_switch, daily_budget_cap, current_daily_spend)
VALUES (1, TRUE, 100.00, 0.00)
ON CONFLICT DO NOTHING;

-- 6. FUNCTIONS & TRIGGERS

-- Trigger: Handle New User Registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    CASE 
      WHEN NEW.email = 'pothurajujaswanthkumar@gmail.com' THEN 'admin'::user_role
      ELSE 'free_user'::user_role
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger: Budget Circuit Breaker
CREATE OR REPLACE FUNCTION public.check_budget_before_transmutation()
RETURNS TRIGGER AS $$
DECLARE
    config RECORD;
BEGIN
    SELECT * FROM public.system_config WHERE id = 1 INTO config;
    
    -- Check Master Switch
    IF NOT config.master_switch THEN
        RAISE EXCEPTION 'System Master Switch is OFF. Production halted.';
    END IF;

    -- Check Budget Cap
    IF config.current_daily_spend >= config.daily_budget_cap THEN
        RAISE EXCEPTION 'Daily budget cap reached ($%). Production halted.', config.daily_budget_cap;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_transmutation_insert
  BEFORE INSERT ON public.transmutations
  FOR EACH ROW EXECUTE FUNCTION public.check_budget_before_transmutation();

-- 7. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transmutations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Transmutations Policies
CREATE POLICY "Users can view own transmutations" ON public.transmutations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own transmutations" ON public.transmutations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all transmutations" ON public.transmutations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- System Config Policies
CREATE POLICY "Everyone can view config" ON public.system_config FOR SELECT USING (true);
CREATE POLICY "Only admins can update config" ON public.system_config FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
