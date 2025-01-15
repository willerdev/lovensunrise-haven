import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Wallet, Building2 } from "lucide-react";

export const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <button className="flex flex-col items-center p-6 border rounded-lg text-center hover:bg-gray-50 transition-colors">
            <CreditCard className="h-8 w-8 mb-2 text-blue-600" />
            <h3 className="font-medium">Bank Transfer</h3>
            <p className="text-sm text-gray-500 mt-1">Direct bank payment</p>
          </button>
          <button className="flex flex-col items-center p-6 border rounded-lg text-center hover:bg-gray-50 transition-colors">
            <Wallet className="h-8 w-8 mb-2 text-blue-600" />
            <h3 className="font-medium">Mobile Money</h3>
            <p className="text-sm text-gray-500 mt-1">Pay via mobile wallet</p>
          </button>
          <button className="flex flex-col items-center p-6 border rounded-lg text-center hover:bg-gray-50 transition-colors">
            <Building2 className="h-8 w-8 mb-2 text-blue-600" />
            <h3 className="font-medium">Cash Payment</h3>
            <p className="text-sm text-gray-500 mt-1">Pay at office</p>
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Monthly Rent - March</p>
                <p className="text-sm text-gray-500">Bank Transfer</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$1,200</p>
                <p className="text-sm text-green-600">Paid</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Monthly Rent - February</p>
                <p className="text-sm text-gray-500">Mobile Money</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$1,200</p>
                <p className="text-sm text-green-600">Paid</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};