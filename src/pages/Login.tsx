import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";

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
      <header className="p-4 bg-white sticky top-0 z-40 flex items-center border-b">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-semibold text-center flex-1 mr-8">Login</h1>
      </header>

      <main className="container mx-auto p-4 max-w-md">
        <div className="p-6">
          <EmailLoginForm onSuccess={handleLoginSuccess} />
        </div>
      </main>
    </div>
  );
};

export default Login;