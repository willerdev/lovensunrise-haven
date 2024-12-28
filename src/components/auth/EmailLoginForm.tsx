import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

interface EmailLoginFormProps {
  onSuccess: () => void;
}

export const EmailLoginForm = ({ onSuccess }: EmailLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Starting login attempt for email:", email);
      
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', email)
        .single();

      console.log("Profile check result:", existingUser);

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        console.error("Login error details:", signInError);
        
        if (signInError.message.includes("Invalid login credentials")) {
          setError("The email or password you entered is incorrect. Please try again, or sign up if you don't have an account.");
        } else if (signInError.message.includes("Email not confirmed")) {
          setError("Please verify your email address before logging in. Check your inbox for the verification link.");
        } else {
          setError(signInError.message);
        }
        return;
      }

      console.log("Login successful, session:", data.session);
      onSuccess();
      
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter your email"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="Enter your password"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-maroon-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};