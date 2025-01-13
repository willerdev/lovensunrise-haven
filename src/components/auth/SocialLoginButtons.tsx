import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export const SocialLoginButtons = () => {
  const handleGoogleLogin = async () => {
    try {
      console.log("Starting Google login process...");
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/complete-profile`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        console.error("Google login error:", error);
        throw error;
      }
    } catch (error) {
      console.error("Error with Google login:", error);
    }
  };

  return (
    <div className="space-y-4 mb-6">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleGoogleLogin}
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google" 
          className="w-5 h-5 mr-2" 
        />
        Continue with Google
      </Button>
    </div>
  );
};