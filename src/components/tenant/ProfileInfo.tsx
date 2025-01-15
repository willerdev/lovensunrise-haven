import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DbProfile } from "@/types/database";
import { User, Phone, Mail, LogOut } from "lucide-react";

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
      <CardContent className="space-y-6">
        {profile && (
          <>
            <div className="flex items-center space-x-4">
              {profile.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || ''} 
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div>
                <h3 className="font-medium text-lg">{profile.full_name}</h3>
                <p className="text-sm text-gray-500 capitalize">{profile.role || 'Tenant'}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{profile.phone || 'No phone number added'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Email address placeholder</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate("/profile")}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="w-full flex items-center justify-center space-x-2 border border-red-600 text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};