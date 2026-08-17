import { UserProfile } from '../types/user';
import { SEED_USERS } from '../data/seedCommunity';
import { supabase } from '../config/supabaseClient';

const AUTH_STORAGE_KEY = 'hype_auth_user_v1';
const USERS_STORAGE_KEY = 'hype_community_users_v1';

class AuthService {
  private users: UserProfile[] = [];

  constructor() {
    this.initUsers();
  }

  private initUsers() {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      try {
        this.users = JSON.parse(saved);
      } catch (e) {
        this.users = [...SEED_USERS];
      }
    } else {
      this.users = [...SEED_USERS];
      this.saveUsers();
    }
  }

  private saveUsers() {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(this.users));
  }

  public getCurrentUser(): UserProfile | null {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const freshUser = this.users.find((u) => u.id === parsed.id || u.email === parsed.email);
        return freshUser || parsed;
      } catch (e) {
        return null;
      }
    }
    // Clean initial state — No auto login!
    return null;
  }

  public setCurrentUser(user: UserProfile | null) {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  public async getUsers(): Promise<UserProfile[]> {
    this.initUsers();
    return this.users;
  }

  public async getAllUsers(): Promise<UserProfile[]> {
    return this.getUsers();
  }

  public async getUserById(id: string): Promise<UserProfile | null> {
    this.initUsers();
    return this.users.find((u) => u.id === id) || null;
  }

  public async getUserByUsername(username: string): Promise<UserProfile | null> {
    this.initUsers();
    return this.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null;
  }

  public async signUp(fullName: string, email: string, password?: string): Promise<UserProfile> {
    this.initUsers();
    const existing = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email address already exists. Please sign in instead.');
    }

    let supabaseUserId: string | null = null;
    try {
      if (password) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) {
          console.warn('[Supabase Auth] SignUp warning:', error.message);
        } else if (data.user) {
          supabaseUserId = data.user.id;
        }
      }
    } catch (e) {
      console.warn('[Supabase Auth] Exception during signup:', e);
    }

    const usernameBase = fullName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newUser: UserProfile = {
      id: supabaseUserId || `user-${Date.now()}`,
      email,
      username: `${usernameBase}${randomSuffix}`,
      fullName,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      role: 'user',
      status: 'active',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      lastActive: 'Just now',
      reputationPoints: 50,
      tierId: 'novice',
      tierName: 'Novice Explorer',
      bio: 'Newly registered community member at Best Buy Cart.',
      location: 'Global',
      stats: {
        wishlistCount: 0,
        watchlistCount: 0,
        reviewsCount: 0,
        helpfulVotesCount: 0,
        commentsCount: 0
      }
    };

    this.users.unshift(newUser);
    this.saveUsers();

    // Sync to Supabase user_profiles table if connected
    try {
      await supabase.from('user_profiles').insert({
        id: newUser.id,
        username: newUser.username,
        full_name: newUser.fullName,
        email: newUser.email,
        avatar_url: newUser.avatarUrl,
        role: newUser.role,
        status: newUser.status,
        reputation_points: newUser.reputationPoints,
        tier_name: newUser.tierName,
        bio: newUser.bio,
        location: newUser.location
      });
    } catch (err) {
      console.warn('[Supabase Sync] Table sync warning:', err);
    }

    this.setCurrentUser(newUser);
    return newUser;
  }

  public async registerWithEmail(fullName: string, email: string, _username?: string): Promise<UserProfile> {
    return this.signUp(fullName, email);
  }

  public async loginWithEmail(email: string, password?: string): Promise<UserProfile> {
    this.initUsers();

    if (!email || !password) {
      throw new Error('Please enter both your email address and password.');
    }

    // Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (!error && data.user) {
        const found = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (found) {
          this.setCurrentUser(found);
          return found;
        }
      }
    } catch (e) {
      console.warn('[Supabase Auth] Fallback to local check');
    }

    const existing = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!existing) {
      throw new Error('No account found with this email address. Please check your credentials or create a new account.');
    }

    if (existing.status === 'banned' || existing.status === 'suspended') {
      throw new Error(`Your account is currently ${existing.status}. Please contact support.`);
    }

    this.setCurrentUser(existing);
    return existing;
  }

  public async loginWithSocial(provider: 'google' | 'apple' | 'github'): Promise<UserProfile> {
    this.initUsers();
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/account`
        }
      });
    } catch (e) {
      console.warn('[Supabase Auth] OAuth error:', e);
    }

    // Mock social login profile creation if offline
    const dummyName = provider.charAt(0).toUpperCase() + provider.slice(1) + ' User';
    const dummyEmail = `user.${provider}@example.com`;
    return this.signUp(dummyName, dummyEmail);
  }

  public async resetPassword(email: string): Promise<boolean> {
    if (!email.trim()) {
      throw new Error('Please enter a valid email address.');
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) {
        console.warn('[Supabase Auth] Reset password warning:', error.message);
      }
    } catch (e) {
      console.warn('[Supabase Auth] Reset password exception:', e);
    }

    return true;
  }

  public async updateUserProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    this.initUsers();
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new Error('User not found');

    this.users[idx] = { ...this.users[idx], ...updates };
    this.saveUsers();

    const current = this.getCurrentUser();
    if (current && current.id === id) {
      this.setCurrentUser(this.users[idx]);
    }

    return this.users[idx];
  }

  public async updateProfile(id: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    return this.updateUserProfile(id, updates);
  }

  public logout(): void {
    supabase.auth.signOut().catch(() => {});
    this.setCurrentUser(null);
  }
}

export const authService = new AuthService();
