
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ error?: any }>;
  signup: (email: string, password: string, name: string) => Promise<{ error?: any }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error?: any }>;
  resetPassword: (password: string) => Promise<{ error?: any }>;
  updateUserProfile: (updatedUser: User) => void;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'mentor' | 'mentee' | 'admin';
  image?: string;
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const supabaseUser = session.user;
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? '',
          // Fix operator precedence with parentheses
          name: supabaseUser.user_metadata?.full_name || (supabaseUser.email ?? ''),
          role: supabaseUser.user_metadata?.role || 'mentee',
          image: supabaseUser.user_metadata?.avatar_url,
          bio: supabaseUser.user_metadata?.bio || '',
        });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    });

    // Then check for existing session
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session?.user) {
        const supabaseUser = data.session.user;
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email ?? '',
          // Fix operator precedence with parentheses
          name: supabaseUser.user_metadata?.full_name || (supabaseUser.email ?? ''),
          role: supabaseUser.user_metadata?.role || 'mentee',
          image: supabaseUser.user_metadata?.avatar_url,
          bio: supabaseUser.user_metadata?.bio || '',
        });
        setIsAuthenticated(true);
      }
    };

    fetchSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        return { error };
      }

      const { user: supabaseUser } = data;

      if (supabaseUser) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError);
          return { error: profileError };
        }

        // We don't need to setUser here as the onAuthStateChange listener will handle it
        return {};
      } else {
        return { error: new Error("Login failed: User data is missing.") };
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      return { error };
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        return { error };
      }

      if (data.user) {
        // Create a profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: name,
              user_type: 'mentee', // Default user type
            },
          ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          return { error: profileError };
        }

        // We don't need to setUser here as the onAuthStateChange listener will handle it
        return {};
      } else {
        return { error: new Error("Signup failed: User data is missing.") };
      }
    } catch (error: any) {
      console.error("Signup error:", error.message);
      return { error };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error: any) {
      console.error("Logout error:", error.message);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        throw error;
      }
      return {};
    } catch (error: any) {
      console.error("Forgot password error:", error.message);
      return { error };
    }
  };

  const resetPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: password });
      if (error) {
        throw error;
      }
      return {};
    } catch (error: any) {
      console.error("Reset password error:", error.message);
      return { error };
    }
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
