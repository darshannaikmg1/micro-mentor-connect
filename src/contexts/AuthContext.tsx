
import React, { createContext, useState, useContext, ReactNode } from "react";

type UserRole = "mentor" | "mentee" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock login function - would connect to your auth service in a real app
  const login = async (email: string, password: string) => {
    // This is a mock implementation
    // In a real app, you would validate credentials against your backend
    console.log("Logging in with:", email, password);
    
    // Mock successful login
    setUser({
      id: "user-123",
      name: "Jane Doe",
      email: email,
      role: "mentee", // Default role for demo
      image: "https://i.pravatar.cc/150?img=32",
    });
  };

  // Mock signup function
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    // This is a mock implementation
    // In a real app, you would create a user in your backend
    console.log("Signing up:", email, password, name, role);
    
    // Mock successful signup
    setUser({
      id: "user-" + Math.floor(Math.random() * 1000),
      name: name,
      email: email,
      role: role,
      image: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
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
