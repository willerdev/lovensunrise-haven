import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const SocialLoginButtons = () => {
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/complete-profile`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error with Google login:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login with Google. Please try again.",
      });
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/complete-profile`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error with Github login:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to login with Github. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleGoogleLogin}
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
      </Button>
      
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleGithubLogin}
      >
        <Github className="w-5 h-5 mr-2" />
        Continue with GitHub
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </div>
  );
};