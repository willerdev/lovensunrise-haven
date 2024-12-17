import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export const Hotels = () => {
  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm py-4 px-4 mb-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Hotels</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            Our hotels section is currently under development. Check back soon for exciting updates!
          </p>
        </div>
      </main>
    </div>
  );
};