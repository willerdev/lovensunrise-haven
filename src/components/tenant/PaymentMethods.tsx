import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";

export const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <button className="p-4 border rounded-lg text-center hover:bg-gray-50">
            <CreditCard className="mx-auto mb-2" />
            Bank Transfer
          </button>
          <button className="p-4 border rounded-lg text-center hover:bg-gray-50">
            <CreditCard className="mx-auto mb-2" />
            Mobile Money
          </button>
          <button className="p-4 border rounded-lg text-center hover:bg-gray-50">
            <CreditCard className="mx-auto mb-2" />
            Cash Payment
          </button>
        </div>
      </CardContent>
    </Card>
  );
};