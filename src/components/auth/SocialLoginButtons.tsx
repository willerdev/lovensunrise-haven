import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const SocialLoginButtons = () => {
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      console.log("Starting Google login process...");
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

  return (
    <div className="space-y-4">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleGoogleLogin}
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
        Continue with Google
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