import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSuccess = async () => {
    try {
      // Fetch user profile to check role
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .single();

      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });

      // Redirect based on user role
      if (!profile?.role) {
        navigate("/complete-profile");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto p-4 max-w-md">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
          <SocialLoginButtons />
          <EmailLoginForm onSuccess={handleLoginSuccess} />
        </div>
      </main>
    </div>
  );
};

export default Login;