import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function saveQuizSubmission(quizData, userId = null, sessionId = null) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('quiz_submissions')
    .insert({
      user_id: userId,
      session_id: sessionId,
      quiz_data: quizData,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function saveScore(scoreData) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('scores')
    .insert(scoreData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getScoreByShareId(shareId) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('share_id', shareId)
    .eq('is_public', true)
    .single();
  if (error) throw error;
  return data;
}

export async function getUserScores(userId) {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getUserProfile(userId) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function updatePremiumStatus(userId, isPremium) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .update({
      is_premium: isPremium,
      premium_expires_at: isPremium ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null,
    })
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}
