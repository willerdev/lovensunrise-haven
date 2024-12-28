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
      console.log("Attempting login with email:", email);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        console.error("Login error:", signInError);
        
        // Handle specific error cases
        switch (signInError.message) {
          case "Invalid login credentials":
            setError("The email or password you entered is incorrect. Please try again.");
            break;
          case "Email not confirmed":
            setError("Please verify your email address before logging in.");
            break;
          default:
            setError(signInError.message);
        }
        return;
      }

      if (data?.session) {
        console.log("Login successful, session:", data.session);
        onSuccess();
      } else {
        console.error("No session data received");
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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