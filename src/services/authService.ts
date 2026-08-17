import { UserProfile } from '../types/user';
import { SEED_USERS } from '../data/seedCommunity';

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
        const freshUser = this.users.find((u) => u.id === parsed.id);
        return freshUser || parsed;
      } catch (e) {
        return null;
      }
    }
    // Default logged in as John Doe for smooth preview
    const defaultUser = this.users[0] || SEED_USERS[0];
    this.setCurrentUser(defaultUser);
    return defaultUser;
  }

  public setCurrentUser(user: UserProfile | null) {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }

  public async loginWithEmail(email: string, _password?: string): Promise<UserProfile> {
    this.initUsers();
    const existing = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (existing.status === 'banned' || existing.status === 'suspended') {
        throw new Error(`Your account is currently ${existing.status}. Please contact support.`);
      }
      this.setCurrentUser(existing);
      return existing;
    }

    // Auto-create if new
    const namePart = email.split('@')[0];
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      username: namePart.toLowerCase().replace(/[^a-z0-9]/g, ''),
      fullName: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      role: 'user',
      status: 'active',
      memberSince: 'August 2026',
      lastActive: 'Just now',
      reputationPoints: 50,
      tierId: 'tier-novice',
      tierName: 'Novice Explorer',
      stats: {
        reviewsCount: 0,
        helpfulVotesCount: 0,
        wishlistCount: 0,
        watchlistCount: 0,
        commentsCount: 0
      }
    };

    this.users.unshift(newUser);
    this.saveUsers();
    this.setCurrentUser(newUser);
    return newUser;
  }

  public async registerWithEmail(fullName: string, email: string, username: string): Promise<UserProfile> {
    this.initUsers();
    const existing = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase() || u.username.toLowerCase() === username.toLowerCase());
    if (existing) {
      throw new Error('An account with this email or username already exists.');
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email,
      username: username.toLowerCase().replace(/[^a-z0-9]/g, ''),
      fullName,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`,
      role: 'user',
      status: 'active',
      memberSince: 'August 2026',
      lastActive: 'Just now',
      reputationPoints: 50,
      tierId: 'tier-novice',
      tierName: 'Novice Explorer',
      stats: {
        reviewsCount: 0,
        helpfulVotesCount: 0,
        wishlistCount: 0,
        watchlistCount: 0,
        commentsCount: 0
      }
    };

    this.users.unshift(newUser);
    this.saveUsers();
    this.setCurrentUser(newUser);
    return newUser;
  }

  public async loginWithSocial(provider: 'google' | 'apple' | 'github'): Promise<UserProfile> {
    const socialNames: Record<string, { name: string; email: string; avatar: string }> = {
      google: {
        name: 'Google User',
        email: 'member@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
      },
      apple: {
        name: 'Apple Member',
        email: 'member@privaterelay.appleid.com',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
      },
      github: {
        name: 'Developer Contributor',
        email: 'dev@github.user',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80'
      }
    };

    const info = socialNames[provider];
    return this.loginWithEmail(info.email);
  }

  public logout() {
    this.setCurrentUser(null);
  }

  public async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    this.initUsers();
    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) throw new Error('User not found');

    this.users[index] = { ...this.users[index], ...updates };
    this.saveUsers();

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(this.users[index]);
    }

    return this.users[index];
  }

  public async getAllUsers(): Promise<UserProfile[]> {
    this.initUsers();
    return [...this.users];
  }

  public async getUserById(userId: string): Promise<UserProfile | null> {
    this.initUsers();
    return this.users.find((u) => u.id === userId) || null;
  }

  public async getUserByUsername(username: string): Promise<UserProfile | null> {
    this.initUsers();
    return this.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || null;
  }
}

export const authService = new AuthService();
