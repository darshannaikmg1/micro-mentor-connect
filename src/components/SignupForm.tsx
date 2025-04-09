
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"mentee" | "mentor">("mentee");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register the user but don't automatically sign them in
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role
          },
        },
      });
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Create a profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: name,
              user_type: role,
              expertise: []
            },
          ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          throw profileError;
        }
        
        // Immediately sign out to prevent auto-login
        await supabase.auth.signOut();
        
        toast({
          title: "Account created",
          description: "Your account has been created successfully. Please login to continue.",
        });
        
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: error.message || "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-gray-900 rounded-lg shadow-lg border border-gray-800 text-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-gray-400 mt-2">Start your mentorship journey today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="bg-gray-800 border-gray-700 text-white"
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-white">I want to</Label>
            <RadioGroup 
              defaultValue="mentee" 
              value={role} 
              onValueChange={(value) => setRole(value as "mentee" | "mentor")}
              className="flex flex-col space-y-2 mt-2"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-md border-gray-700 hover:border-indigo-500 cursor-pointer bg-gray-800">
                <RadioGroupItem value="mentee" id="mentee" className="text-indigo-500" />
                <Label htmlFor="mentee" className="cursor-pointer flex-grow text-white">
                  <div className="font-medium">Find a Mentor</div>
                  <div className="text-sm text-gray-400">I'm looking for guidance and support</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-md border-gray-700 hover:border-indigo-500 cursor-pointer bg-gray-800">
                <RadioGroupItem value="mentor" id="mentor" className="text-indigo-500" />
                <Label htmlFor="mentor" className="cursor-pointer flex-grow text-white">
                  <div className="font-medium">Become a Mentor</div>
                  <div className="text-sm text-gray-400">I want to share my expertise and help others</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account?</span>{" "}
          <Link to="/login" className="text-indigo-400 hover:underline font-medium">
            Log in
          </Link>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-indigo-400 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-indigo-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
