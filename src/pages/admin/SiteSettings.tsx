import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const SiteSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    site_email: "",
    site_phone: "",
    site_address: "",
    site_website: "",
  });

  const { data: siteSettings, isLoading: isLoadingSettings } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*");

      if (error) {
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
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
      }));

      const { error } = await supabase
        .from("site_settings")
        .upsert(updates, { onConflict: "key" });

      if (error) throw error;
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