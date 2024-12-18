import { Card } from "@/components/ui/card";

interface PaymentSummaryProps {
  title: string;
  price: number;
  type: string;
}

export const PaymentSummary = ({ title, price, type }: PaymentSummaryProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Item</span>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type</span>
          <span className="font-medium">{type}</span>
        </div>
        <div className="flex justify-between border-t pt-2 mt-2">
          <span className="text-gray-600">Total Amount</span>
          <span className="font-semibold">${price.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
};