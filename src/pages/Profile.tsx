import { MobileNav } from "../components/MobileNav";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-20">
      <header className="p-4 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <h1 className="text-2xl font-semibold text-center">Profile</h1>
      </header>

      <main className="container mx-auto p-4 max-w-md">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <p className="text-center text-gray-500">Please log in to view your profile</p>
          <div className="flex flex-col gap-2">
            <Button onClick={() => navigate("/login")}>Log In</Button>
            <Button variant="outline" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default Profile;