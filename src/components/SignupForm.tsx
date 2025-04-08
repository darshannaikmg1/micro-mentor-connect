
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";

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
      await signup(email, password, name, role);
      toast({
        title: "Account created",
        description: "Welcome to MicroMentor!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-sm border">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-gray-600 mt-2">Start your mentorship journey today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>

          <div className="space-y-2">
            <Label>I want to</Label>
            <RadioGroup 
              defaultValue="mentee" 
              value={role} 
              onValueChange={(value) => setRole(value as "mentee" | "mentor")}
              className="flex flex-col space-y-2 mt-2"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-md border-gray-200 hover:border-primary/50 cursor-pointer">
                <RadioGroupItem value="mentee" id="mentee" />
                <Label htmlFor="mentee" className="cursor-pointer flex-grow">
                  <div className="font-medium">Find a Mentor</div>
                  <div className="text-sm text-gray-500">I'm looking for guidance and support</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-md border-gray-200 hover:border-primary/50 cursor-pointer">
                <RadioGroupItem value="mentor" id="mentor" />
                <Label htmlFor="mentor" className="cursor-pointer flex-grow">
                  <div className="font-medium">Become a Mentor</div>
                  <div className="text-sm text-gray-500">I want to share my expertise and help others</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Log in
          </Link>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
