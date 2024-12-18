import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SiteSettings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    site_email: "",
    site_phone: "",
    site_address: "",
    site_website: "",
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to access this page");
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        toast.error("You don't have permission to access this page");
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate]);

  const { data: siteSettings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      console.log("Fetching site settings...");
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) {
        console.error("Error fetching site settings:", error);
        toast.error("Failed to fetch site settings");
        throw error;
      }

      const settingsMap = data.reduce((acc: any, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {});

      setSettings(settingsMap);
      return data;
    },
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // First check if user is still admin
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please login to continue");
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        toast.error("You don't have permission to perform this action");
        navigate("/");
        return;
      }

      // Insert settings one by one to avoid the body stream already read error
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from("site_settings")
          .upsert({
            key,
            value: value || "",
          }, {
            onConflict: "key"
          });

        if (error) {
          console.error(`Error updating setting ${key}:`, error);
          throw error;
        }
      }
      
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingSettings) {
    return <div className="flex justify-center p-8"><Loader className="animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Site Settings</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Site Email</label>
          <Input
            value={settings.site_email}
            onChange={(e) =>
              setSettings({ ...settings, site_email: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Site Phone</label>
          <Input
            value={settings.site_phone}
            onChange={(e) =>
              setSettings({ ...settings, site_phone: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Site Address</label>
          <Input
            value={settings.site_address}
            onChange={(e) =>
              setSettings({ ...settings, site_address: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Site Website</label>
          <Input
            value={settings.site_website}
            onChange={(e) =>
              setSettings({ ...settings, site_website: e.target.value })
            }
          />
        </div>
        <Button 
          className="w-full" 
          onClick={handleSave} 
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default SiteSettings;