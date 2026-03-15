import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  initialize: async () => {
    if (!supabase) {
      set({ loading: false });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      set({ user: session.user, profile, loading: false });
    } else {
      set({ loading: false });
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        set({ user: session.user, profile });
      } else {
        set({ user: null, profile: null });
      }
    });
  },

  signUp: async (email, password, fullName) => {
    if (!supabase) return { error: { message: 'Supabase not configured' } };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { data, error };
  },

  signIn: async (email, password) => {
    if (!supabase) return { error: { message: 'Supabase not configured' } };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  },

  signInWithGoogle: async () => {
    if (!supabase) return { error: { message: 'Supabase not configured' } };
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    return { data, error };
  },

  signOut: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null, profile: null });
  },
}));
