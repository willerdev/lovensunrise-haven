import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

export const ConsentForm = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate("/procuration/form");
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Allow Lovensunrise to Buy, Sell, and Lend Properties for You</CardTitle>
        <CardDescription>
          Please review the terms and conditions below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] rounded-md border p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Terms and Conditions</h3>
            <p>
              By agreeing to these terms, you authorize Lovensunrise to act as your legal representative
              in real estate transactions, including but not limited to buying, selling, and renting properties
              on your behalf.
            </p>
            {/* Add more terms and conditions as needed */}
            <h4 className="font-semibold">1. Scope of Authority</h4>
            <p>
              The procuration holder will have the authority to execute real estate transactions on your behalf,
              including signing contracts, negotiating terms, and handling financial transactions related to
              the specified properties.
            </p>
            <h4 className="font-semibold">2. Duration</h4>
            <p>
              The procuration will be valid for the period specified in the subsequent form. You may revoke
              this authority at any time by submitting a written notice.
            </p>
            <h4 className="font-semibold">3. Responsibilities</h4>
            <p>
              The procuration holder commits to acting in your best interest, maintaining transparency,
              and providing regular updates about all transactions and activities performed under this authority.
            </p>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Decline
        </Button>
        <Button onClick={handleAgree}>
          I Agree
        </Button>
      </CardFooter>
    </Card>
  );
};