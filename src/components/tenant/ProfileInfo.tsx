import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DbProfile } from "@/types/database";

interface ProfileInfoProps {
  profile: DbProfile | null;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile && (
          <>
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <p>{profile.full_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <p>{profile.phone}</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="w-full border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50"
            >
              Logout
            </button>
          </>
        )}
      </CardContent>
    </Card>
  );
};