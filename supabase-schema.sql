-- Japa Score Supabase Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Users table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    premium_expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quiz submissions
CREATE TABLE quiz_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id),
    session_id TEXT, -- for anonymous users
    quiz_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scores
CREATE TABLE scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID REFERENCES quiz_submissions(id),
    user_id UUID REFERENCES profiles(id),
    session_id TEXT,
    total_score INTEGER NOT NULL,
    breakdown JSONB NOT NULL,
    grade TEXT NOT NULL,
    ai_analysis JSONB, -- null for free tier initially, populated after AI call
    share_id TEXT UNIQUE DEFAULT gen_random_uuid()::text,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own scores" ON scores FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own scores" ON scores FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Public scores are readable by all" ON scores FOR SELECT USING (is_public = true);

CREATE POLICY "Users can read own submissions" ON quiz_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert submissions" ON quiz_submissions FOR INSERT WITH CHECK (true);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
